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
      }
      messages {
        id
        content
        type
        createdAt
        updatedAt
        contentHistory
        from {
            id
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
      updatedAt
      createdAt
      contentHistory
      from {
          id
      }
      conversation {
          id
      }
    }
  }
`);
