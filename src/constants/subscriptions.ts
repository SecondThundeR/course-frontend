import { gql } from '@/__generated__';

export const CONVERSATION_UPDATES = gql(`
    subscription ConversationUpdates {
        conversationUpdates {
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
    subscription MessageUpdates {
        messageUpdates {
            type
            message {
                id
                content
                type
                createdAt
                updatedAt
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
