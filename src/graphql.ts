import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';

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

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
