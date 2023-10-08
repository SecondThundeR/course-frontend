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
