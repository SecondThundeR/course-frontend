/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation LoginMutation($data: LoginInput!) {\n    login(data: $data) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.LoginMutationDocument,
    "\n  mutation SignupMutation($data: SignupInput!) {\n    signup(data: $data) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.SignupMutationDocument,
    "\n    query CurrentUser {\n        currentUser {\n            id\n            firstname\n            lastname\n            email\n        }\n    }": types.CurrentUserDocument,
    "\n    query ConversationsData($userId: String!) {\n        userConversations(userId: $userId) {\n            id\n            createdAt\n            updatedAt\n            participants {\n                id\n                firstname\n                lastname\n            }\n            messages {\n                id\n                content\n                type\n                createdAt\n                updatedAt\n                contentHistory\n                from {\n                    id\n                }\n            }\n        }\n    }\n": types.ConversationsDataDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LoginMutation($data: LoginInput!) {\n    login(data: $data) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation LoginMutation($data: LoginInput!) {\n    login(data: $data) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignupMutation($data: SignupInput!) {\n    signup(data: $data) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation SignupMutation($data: SignupInput!) {\n    signup(data: $data) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query CurrentUser {\n        currentUser {\n            id\n            firstname\n            lastname\n            email\n        }\n    }"): (typeof documents)["\n    query CurrentUser {\n        currentUser {\n            id\n            firstname\n            lastname\n            email\n        }\n    }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query ConversationsData($userId: String!) {\n        userConversations(userId: $userId) {\n            id\n            createdAt\n            updatedAt\n            participants {\n                id\n                firstname\n                lastname\n            }\n            messages {\n                id\n                content\n                type\n                createdAt\n                updatedAt\n                contentHistory\n                from {\n                    id\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query ConversationsData($userId: String!) {\n        userConversations(userId: $userId) {\n            id\n            createdAt\n            updatedAt\n            participants {\n                id\n                firstname\n                lastname\n            }\n            messages {\n                id\n                content\n                type\n                createdAt\n                updatedAt\n                contentHistory\n                from {\n                    id\n                }\n            }\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;