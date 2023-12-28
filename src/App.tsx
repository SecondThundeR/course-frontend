import '@mantine/core/styles.css';

import { memo } from 'react';
import { MantineProvider } from '@mantine/core';
import { ApolloProvider } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

import { Router } from './router';
import { theme } from './theme';
import { client } from './graphql';

if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}

const App = memo(() => (
  <MantineProvider theme={theme}>
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  </MantineProvider>
));

export default App;
