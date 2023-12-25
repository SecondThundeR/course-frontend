import { memo } from 'react';
import { Flex } from '@mantine/core';
import { Navigate } from 'react-router-dom';

import { CHAT_ROUTE } from '@/constants/routes';

import { useChatScroll, useChatSend } from '@/hooks';

import { useConversationsStore, useUserStore } from '@/store';

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
  const targetRef = useChatScroll(currentConversation.messages);

  if (!currentConversation) {
    return <Navigate to={CHAT_ROUTE} />;
  }

  const chatMessages = currentConversation.messages
    .toReversed()
    .map(({ id, content, createdAt, type, from }) => {
      if (from?.id !== userData?.id) {
        return (
          <Message.To
            key={id}
            id={id}
            content={content}
            createdAt={createdAt as string}
            type={type}
          />
        );
      }
      return (
        <Message.From
          key={id}
          id={id}
          content={content}
          createdAt={createdAt as string}
          type={type}
        />
      );
    });

  return (
    <Flex w="100%" direction="column">
      <Flex direction="column-reverse" gap="md" className={classes.messages__wrapper} p="md">
        <div id="scroll-div" ref={targetRef} />
        {chatMessages}
      </Flex>
      <Input isLoading={loading} onSubmit={onSend} />
    </Flex>
  );
});

export default Conversation;
