import { Fragment, memo } from 'react';
import { Flex, Title } from '@mantine/core';
import { Navigate } from 'react-router-dom';

import { CHAT_ROUTE } from '@/constants/routes';

import { useChatScroll, useChatSend, useMessageModalDelete } from '@/hooks';

import { useConversationsStore, useUserStore } from '@/store';

import { isDaysDifferent } from '@/utils/isDaysDifferent';

import { BottomAffix } from '../BottomAffix';
import { DeleteMessageModal } from '../DeleteMessageModal';
import { Input } from '../Input';
import { Message } from '../Message';

import classes from './Conversation.module.css';
import { type ConversationProps } from './interfaces';

const Conversation = memo(function Conversation({ chatId }: ConversationProps) {
  const { onSend, loading } = useChatSend(chatId);
  const {
    opened,
    loading: deleteLoading,
    error,
    handlers: { onOpen, onClose, onDelete },
  } = useMessageModalDelete();
  const userData = useUserStore.use.userData();
  const conversations = useConversationsStore.use.conversations();
  const currentConversation = conversations.find((conversation) => conversation.id === chatId);
  const { targetRef, onScroll } = useChatScroll(currentConversation?.messages.at(-1));

  if (!currentConversation) {
    return <Navigate to={CHAT_ROUTE} />;
  }

  const chatMessages = currentConversation.messages
    .map(({ id, content, createdAt, updatedAt, type, from }, index, messagesArray) => {
      const prevCreatedAt = messagesArray[index - 1]?.createdAt as string | undefined;
      const currCreatedAt = createdAt as string;
      const currUpdatedAt = updatedAt as string;
      const isDifferent = isDaysDifferent(prevCreatedAt, currCreatedAt);
      const dateSeparatorDate = isDifferent ? new Date(currCreatedAt) : undefined;

      const MessageComponent = from?.id !== userData?.id ? Message.To : Message.From;
      const fragmentKey = isDifferent ? `${id}-${currCreatedAt.toString()}` : id;

      return (
        <Fragment key={fragmentKey}>
          <MessageComponent
            id={id}
            content={content}
            createdAt={currCreatedAt}
            updatedAt={currUpdatedAt}
            type={type}
            onOpen={onOpen}
          />
          {isDifferent && <Message.DateSeparator date={dateSeparatorDate} />}
        </Fragment>
      );
    })
    .toReversed();
  const isChatEmpty = chatMessages.length === 0;

  return (
    <>
      <Flex
        direction="column-reverse"
        align={isChatEmpty ? 'center' : undefined}
        justify={isChatEmpty ? 'center' : undefined}
        gap="md"
        className={classes.messages__wrapper}
        p="md"
      >
        {isChatEmpty ? (
          <Title order={2}>Самое время начать общение!</Title>
        ) : (
          <>
            <div id="scroll-div" ref={targetRef} />
            {chatMessages}
          </>
        )}
      </Flex>
      <Input isLoading={loading} onSubmit={onSend} />
      <BottomAffix onScroll={onScroll} />
      <DeleteMessageModal
        opened={opened}
        loading={deleteLoading}
        error={error}
        onClose={onClose}
        onDelete={onDelete}
      />
    </>
  );
});

export default Conversation;
