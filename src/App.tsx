import '@mantine/core/styles.css';

import { memo } from 'react';
import { MantineProvider } from '@mantine/core';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

import { Router } from './router';
import { theme } from './theme';
import { Kind, OperationTypeNode } from 'graphql';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3000/graphql',
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === Kind.OPERATION_DEFINITION &&
      definition.operation === OperationTypeNode.SUBSCRIPTION
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

const App = memo(() => (
  <ApolloProvider client={client}>
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  </ApolloProvider>
));

export default App;
