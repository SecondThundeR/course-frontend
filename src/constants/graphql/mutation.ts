import { gql } from '@/__generated__';

export const LOGIN_MUTATION = gql(`
  mutation LoginMutation($data: LoginInput!) {
    login(data: $data) {
      accessToken
      refreshToken
    }
  }
`);

export const SIGNUP_MUTATION = gql(`
  mutation SignupMutation($data: SignupInput!) {
    signup(data: $data) {
      accessToken
      refreshToken
    }
  }
`);

export const CREATE_CONVERSATION = gql(`
  mutation CreateConversation($data: CreateConversationInput!) {
    createConversation(data: $data) {
      id
      createdAt
      updatedAt
      participants {
        id
        firstname
        lastname
        email
      }
      messages {
        id
        type
        content
        contentHistory
        createdAt
        updatedAt
        from {
          id
          email
        }
      }
    }
  }
`);

export const CREATE_MESSAGE = gql(`
  mutation CreateMessage($data: CreateMessageInput!) {
    createMessage(data: $data) {
      id
      type
      content
      contentHistory
      createdAt
      updatedAt
      from {
        id
        email
      }
      conversation {
        id
      }
    }
  }
`);

export const EDIT_MESSAGE = gql(`
  mutation EditMessage($data: EditMessageInput!) {
    editMessage(data: $data) {
      id
      type
      content
      contentHistory
      createdAt
      updatedAt
      from {
        id
        email
      }
      conversation {
        id
      }
    }
  }
`);

export const DELETE_CONVERSATION = gql(`
  mutation DeleteConversation($data: DeleteConversationInput!) {
    deleteConversation(data: $data) {
      id
    }
  }
`);

export const DELETE_MESSAGE = gql(`
  mutation DeleteMessage($messageId: String!) {
    deleteMessage(messageId: $messageId) {
      id
      type
      content
      contentHistory
      createdAt
      updatedAt
      from {
        id
        email
      }
      conversation {
        id
      }
    }
  }
`);
