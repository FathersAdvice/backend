

export default `
    type Advice {
       id: ID
       author: User!
       title: String!
       describe: String
       date_time_creater: String
       date_time_update: String
    }
    type Query {
        getUsers: [User]
        getAdvises: [Advice]
    }
    type Mutation { 
        addUser(username: String!, email: String!, password: String!, avatar: String): MessageStatus!
        removeUser(id: ID!): MessageStatus!
        changeUser(id: ID!, username: String, email: String, password: String, avatar: String): MessageStatus!
    }
    type User {
        id: ID
        username: String!
        password: String!
        email: String!
        avatar: String
    }
    type MessageStatus {
       status: Boolean!
       msg: String!
       user: User
    }
`;
