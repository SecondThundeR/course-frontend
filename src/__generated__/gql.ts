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
    "\n  mutation CreateConversation($data: CreateConversationInput!) {\n    createConversation(data: $data) {\n      id\n      createdAt\n      updatedAt\n      participants {\n        id\n        firstname\n        lastname\n        email\n      }\n      messages {\n        id\n        type\n        content\n        contentHistory\n        createdAt\n        updatedAt\n        from {\n          id\n          email\n        }\n      }\n    }\n  }\n": types.CreateConversationDocument,
    "\n  mutation CreateMessage($data: CreateMessageInput!) {\n    createMessage(data: $data) {\n      id\n      type\n      content\n      contentHistory\n      createdAt\n      updatedAt\n      from {\n        id\n        email\n      }\n      conversation {\n        id\n      }\n    }\n  }\n": types.CreateMessageDocument,
    "\n  mutation EditMessage($data: EditMessageInput!) {\n    editMessage(data: $data) {\n      id\n      type\n      content\n      contentHistory\n      createdAt\n      updatedAt\n      from {\n        id\n        email\n      }\n      conversation {\n        id\n      }\n    }\n  }\n": types.EditMessageDocument,
    "\n  mutation DeleteConversation($data: DeleteConversationInput!) {\n    deleteConversation(data: $data) {\n      id\n    }\n  }\n": types.DeleteConversationDocument,
    "\n  mutation DeleteMessage($messageId: String!) {\n    deleteMessage(messageId: $messageId) {\n      id\n      type\n      content\n      contentHistory\n      createdAt\n      updatedAt\n      from {\n        id\n        email\n      }\n      conversation {\n        id\n      }\n    }\n  }\n": types.DeleteMessageDocument,
    "\n  mutation CreateAnonymousMessage($data: CreateAnonymousMessageInput!) {\n    createAnonymousMessage(data: $data) {\n      id\n      type\n      content\n      createdAt\n      updatedAt\n      fromId\n    }\n  }\n": types.CreateAnonymousMessageDocument,
    "\n    query CurrentUser {\n        currentUser {\n            id\n            firstname\n            lastname\n            email\n        }\n    }": types.CurrentUserDocument,
    "\n    query ConversationsData($userId: String!) {\n        userConversations(userId: $userId) {\n            id\n            createdAt\n            updatedAt\n            participants {\n                id\n                firstname\n                lastname\n                email\n            }\n            messages {\n                id\n                content\n                type\n                createdAt\n                updatedAt\n                contentHistory\n                from {\n                    id\n                    email\n                }\n            }\n        }\n    }\n": types.ConversationsDataDocument,
    "\n    query AnonymousChatUsername {\n        assignRandomUsername\n    }\n": types.AnonymousChatUsernameDocument,
    "\n    subscription ConversationUpdates($userId: String!) {\n        conversationUpdates(userId: $userId) {\n            type\n            conversation {\n                id\n                createdAt\n                updatedAt\n                participants {\n                    id\n                    firstname\n                    lastname\n                    email\n                }\n                messages {\n                    id\n                    content\n                    type\n                    createdAt\n                    updatedAt\n                    contentHistory\n                    from {\n                        id\n                        email\n                    }\n                }\n            }\n        }\n    }\n": types.ConversationUpdatesDocument,
    "\n    subscription MessageUpdates($userId: String!) {\n        messageUpdates(userId: $userId) {\n            type\n            message {\n                id\n                type\n                content\n                updatedAt\n                createdAt\n                contentHistory\n                from {\n                    id\n                    email\n                }\n                conversation {\n                    id\n                }\n            }\n        }\n    }\n": types.MessageUpdatesDocument,
    "\n    subscription AnonymousMessageUpdates {\n        anonymousMessageUpdates {\n            type\n            message {\n                id\n                type\n                content\n                createdAt\n                updatedAt\n                fromId\n            }\n        }\n    }\n": types.AnonymousMessageUpdatesDocument,
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
export function gql(source: "\n  mutation CreateConversation($data: CreateConversationInput!) {\n    createConversation(data: $data) {\n      id\n      createdAt\n      updatedAt\n      participants {\n        id\n        firstname\n        lastname\n        email\n      }\n      messages {\n        id\n        type\n        content\n        contentHistory\n        createdAt\n        updatedAt\n        from {\n          id\n          email\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateConversation($data: CreateConversationInput!) {\n    createConversation(data: $data) {\n      id\n      createdAt\n      updatedAt\n      participants {\n        id\n        firstname\n        lastname\n        email\n      }\n      messages {\n        id\n        type\n        content\n        contentHistory\n        createdAt\n        updatedAt\n        from {\n          id\n          email\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateMessage($data: CreateMessageInput!) {\n    createMessage(data: $data) {\n      id\n      type\n      content\n      contentHistory\n      createdAt\n      updatedAt\n      from {\n        id\n        email\n      }\n      conversation {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMessage($data: CreateMessageInput!) {\n    createMessage(data: $data) {\n      id\n      type\n      content\n      contentHistory\n      createdAt\n      updatedAt\n      from {\n        id\n        email\n      }\n      conversation {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditMessage($data: EditMessageInput!) {\n    editMessage(data: $data) {\n      id\n      type\n      content\n      contentHistory\n      createdAt\n      updatedAt\n      from {\n        id\n        email\n      }\n      conversation {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation EditMessage($data: EditMessageInput!) {\n    editMessage(data: $data) {\n      id\n      type\n      content\n      contentHistory\n      createdAt\n      updatedAt\n      from {\n        id\n        email\n      }\n      conversation {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteConversation($data: DeleteConversationInput!) {\n    deleteConversation(data: $data) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteConversation($data: DeleteConversationInput!) {\n    deleteConversation(data: $data) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteMessage($messageId: String!) {\n    deleteMessage(messageId: $messageId) {\n      id\n      type\n      content\n      contentHistory\n      createdAt\n      updatedAt\n      from {\n        id\n        email\n      }\n      conversation {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteMessage($messageId: String!) {\n    deleteMessage(messageId: $messageId) {\n      id\n      type\n      content\n      contentHistory\n      createdAt\n      updatedAt\n      from {\n        id\n        email\n      }\n      conversation {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateAnonymousMessage($data: CreateAnonymousMessageInput!) {\n    createAnonymousMessage(data: $data) {\n      id\n      type\n      content\n      createdAt\n      updatedAt\n      fromId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAnonymousMessage($data: CreateAnonymousMessageInput!) {\n    createAnonymousMessage(data: $data) {\n      id\n      type\n      content\n      createdAt\n      updatedAt\n      fromId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query CurrentUser {\n        currentUser {\n            id\n            firstname\n            lastname\n            email\n        }\n    }"): (typeof documents)["\n    query CurrentUser {\n        currentUser {\n            id\n            firstname\n            lastname\n            email\n        }\n    }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query ConversationsData($userId: String!) {\n        userConversations(userId: $userId) {\n            id\n            createdAt\n            updatedAt\n            participants {\n                id\n                firstname\n                lastname\n                email\n            }\n            messages {\n                id\n                content\n                type\n                createdAt\n                updatedAt\n                contentHistory\n                from {\n                    id\n                    email\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query ConversationsData($userId: String!) {\n        userConversations(userId: $userId) {\n            id\n            createdAt\n            updatedAt\n            participants {\n                id\n                firstname\n                lastname\n                email\n            }\n            messages {\n                id\n                content\n                type\n                createdAt\n                updatedAt\n                contentHistory\n                from {\n                    id\n                    email\n                }\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query AnonymousChatUsername {\n        assignRandomUsername\n    }\n"): (typeof documents)["\n    query AnonymousChatUsername {\n        assignRandomUsername\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription ConversationUpdates($userId: String!) {\n        conversationUpdates(userId: $userId) {\n            type\n            conversation {\n                id\n                createdAt\n                updatedAt\n                participants {\n                    id\n                    firstname\n                    lastname\n                    email\n                }\n                messages {\n                    id\n                    content\n                    type\n                    createdAt\n                    updatedAt\n                    contentHistory\n                    from {\n                        id\n                        email\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    subscription ConversationUpdates($userId: String!) {\n        conversationUpdates(userId: $userId) {\n            type\n            conversation {\n                id\n                createdAt\n                updatedAt\n                participants {\n                    id\n                    firstname\n                    lastname\n                    email\n                }\n                messages {\n                    id\n                    content\n                    type\n                    createdAt\n                    updatedAt\n                    contentHistory\n                    from {\n                        id\n                        email\n                    }\n                }\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription MessageUpdates($userId: String!) {\n        messageUpdates(userId: $userId) {\n            type\n            message {\n                id\n                type\n                content\n                updatedAt\n                createdAt\n                contentHistory\n                from {\n                    id\n                    email\n                }\n                conversation {\n                    id\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    subscription MessageUpdates($userId: String!) {\n        messageUpdates(userId: $userId) {\n            type\n            message {\n                id\n                type\n                content\n                updatedAt\n                createdAt\n                contentHistory\n                from {\n                    id\n                    email\n                }\n                conversation {\n                    id\n                }\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription AnonymousMessageUpdates {\n        anonymousMessageUpdates {\n            type\n            message {\n                id\n                type\n                content\n                createdAt\n                updatedAt\n                fromId\n            }\n        }\n    }\n"): (typeof documents)["\n    subscription AnonymousMessageUpdates {\n        anonymousMessageUpdates {\n            type\n            message {\n                id\n                type\n                content\n                createdAt\n                updatedAt\n                fromId\n            }\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;