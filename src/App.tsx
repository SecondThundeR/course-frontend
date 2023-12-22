import '@mantine/core/styles.css';

import { memo } from 'react';
import { MantineProvider } from '@mantine/core';
import { ApolloProvider } from '@apollo/client';

import { Router } from './router';
import { theme } from './theme';
import { client } from './graphql';

const App = memo(() => (
  <ApolloProvider client={client}>
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  </ApolloProvider>
));

export default App;
