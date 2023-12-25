import { gql } from '@/__generated__';

export const CONVERSATION_UPDATES = gql(`
    subscription ConversationUpdates($userId: String!) {
        conversationUpdates(userId: $userId) {
            type
            conversation {
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
    }
`);

export const MESSAGE_UPDATES = gql(`
    subscription MessageUpdates($userId: String!) {
        messageUpdates(userId: $userId) {
            type
            message {
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
    }
`);
