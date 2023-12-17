import { memo } from 'react';
import { Button } from '@mantine/core';

import { useCurrentUser } from '@/hooks';

const Chat = memo(function Chat() {
  const [data, onSignout] = useCurrentUser();

  return (
    <>
      <h1>Data: {JSON.stringify(data)}</h1>
      <Button onClick={onSignout}>Signout</Button>
    </>
  );
});

export default Chat;
