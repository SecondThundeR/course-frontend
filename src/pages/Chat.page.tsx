import { memo } from 'react';

import useMe from '@/hooks/useMe';

const Chat = memo(() => {
  const data = useMe();

  return <h1>{JSON.stringify(data)}</h1>;
});

export default Chat;
