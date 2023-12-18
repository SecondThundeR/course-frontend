import '@mantine/core/styles.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { memo } from 'react';
import { MantineProvider } from '@mantine/core';

import { Router } from './router';
import { theme } from './theme';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

const App = memo(function App() {
  return (
    <ApolloProvider client={client}>
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </ApolloProvider>
  );
});

export default App;
