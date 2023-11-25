import { memo } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Button } from '@mantine/core';

const Chat = memo(() => {
  const [data, onSignout] = useCurrentUser();

  return (
    <>
      <h1>Data: {JSON.stringify(data)}</h1>
      <Button onClick={onSignout}>Signout</Button>
    </>
  );
});

export default Chat;
