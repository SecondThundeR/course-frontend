import { Fragment, memo } from 'react';
import { Flex } from '@mantine/core';
import { Navigate } from 'react-router-dom';

import { CHAT_ROUTE } from '@/constants/routes';

import { useChatScroll, useChatSend } from '@/hooks';

import { useConversationsStore, useUserStore } from '@/store';

import { isDaysDifferent } from '@/utils/isDaysDifferent';

import { BottomAffix } from '../BottomAffix';
import { Input } from '../Input';
import { Message } from '../Message';

import classes from './Conversation.module.css';

type ConversationProps = {
  chatId?: string;
};

const Conversation = memo(function Conversation({ chatId }: ConversationProps) {
  const { onSend, loading } = useChatSend(chatId);
  const userData = useUserStore((state) => state.userData);
  const conversations = useConversationsStore((state) => state.conversations);
  const currentConversation = conversations.filter((conversation) => conversation.id === chatId)[0];
  const { targetRef, onScroll } = useChatScroll(currentConversation?.messages);

  if (!currentConversation) {
    return <Navigate to={CHAT_ROUTE} />;
  }

  const chatMessages = currentConversation.messages
    .map(({ id, content, createdAt, type, from }, index, messagesArray) => {
      const prevCreatedAt = messagesArray[index - 1]?.createdAt as string | undefined;
      const currCreatedAt = createdAt as string;
      const isDifferent = isDaysDifferent(prevCreatedAt, currCreatedAt);
      const MessageComponent = from?.id !== userData?.id ? Message.To : Message.From;
      const fragmentKey = isDifferent ? `${id}-${currCreatedAt.toString()}` : id;

      return (
        <Fragment key={fragmentKey}>
          <MessageComponent id={id} content={content} createdAt={currCreatedAt} type={type} />
          {isDifferent && <Message.DateSeparator date={new Date(currCreatedAt)} />}
        </Fragment>
      );
    })
    .toReversed();

  return (
    <>
      <Flex w="100%" direction="column">
        <Flex direction="column-reverse" gap="md" className={classes.messages__wrapper} p="md">
          <div id="scroll-div" ref={targetRef} />
          {chatMessages}
        </Flex>
        <Input isLoading={loading} onSubmit={onSend} />
      </Flex>
      <BottomAffix onScroll={onScroll} />
    </>
  );
});

export default Conversation;
