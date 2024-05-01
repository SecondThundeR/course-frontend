import { Fragment, memo } from 'react';
import { Flex, Title } from '@mantine/core';

import { BottomAffix } from '@/components/Chat/BottomAffix';

import { useAnonymousChatMessages, useAnonymousChatScroll, useAnonymousChatSend } from '@/hooks';

import { isDaysDifferent } from '@/utils/isDaysDifferent';

import { Input } from '../Input';
import { Message } from '../Message';

import classes from './ChatRoom.module.css';

import { type ChatRoomProps } from './interfaces';

const ChatRoom = memo(function ChatRoom({ username }: ChatRoomProps) {
  const { onSend, loading } = useAnonymousChatSend(username);
  const { messages } = useAnonymousChatMessages();
  const { targetRef, onScroll } = useAnonymousChatScroll(username, messages.at(-1));

  const chatMessages = messages
    .map(({ id, content, createdAt, updatedAt, type, fromId }, index, messagesArray) => {
      const prevCreatedAt = messagesArray[index - 1]?.createdAt as string | undefined;
      const currCreatedAt = createdAt as string;
      const currUpdatedAt = updatedAt as string;
      const isDifferent = isDaysDifferent(prevCreatedAt, currCreatedAt);
      const dateSeparatorDate = isDifferent ? new Date(currCreatedAt) : undefined;

      const MessageComponent = fromId !== username ? Message.To : Message.From;
      const fragmentKey = isDifferent ? `${id}-${currCreatedAt.toString()}` : id;

      return (
        <Fragment key={fragmentKey}>
          <MessageComponent
            fromId={fromId}
            content={content}
            createdAt={currCreatedAt}
            updatedAt={currUpdatedAt}
            type={type}
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
    </>
  );
});

export default ChatRoom;
