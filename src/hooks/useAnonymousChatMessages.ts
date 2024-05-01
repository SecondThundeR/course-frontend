import { useCallback, useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';

import {
  type AnonymousMessage,
  UpdateType,
  type AnonymousMessageUpdatesSubscription,
} from '@/__generated__/graphql';

import { ANONYMOUS_MESSAGE_UPDATES } from '@/constants/graphql/subscriptions';

export function useAnonymousChatMessages() {
  const [messages, setMessages] = useState<AnonymousMessage[]>([]);
  const { data: messageUpdate } = useSubscription(ANONYMOUS_MESSAGE_UPDATES);

  const processMessageUpdate = useCallback((update: AnonymousMessageUpdatesSubscription) => {
    const { type, message } = update.anonymousMessageUpdates;

    switch (type) {
      case UpdateType.Added:
        setMessages((prev) => [...prev, message]);
        break;
    }
  }, []);

  useEffect(() => {
    if (messageUpdate === undefined) return;
    processMessageUpdate(messageUpdate);
  }, [messageUpdate, processMessageUpdate]);

  return { messages };
}
