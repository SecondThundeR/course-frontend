import { gql } from '@/__generated__';

export const CURRENT_USER = gql(`
    query CurrentUser {
        currentUser {
            id
            firstname
            lastname
            email
        }
    }`);

export const CONVERSATIONS_DATA = gql(`
    query ConversationsData($userId: String!) {
        userConversations(userId: $userId) {
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
