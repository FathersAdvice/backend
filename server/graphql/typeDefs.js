export default `
    type Query {
        getUsers: [User]
    }
    type Mutation { 
        addUser(username: String!, email: String!, password: String!, avatar: String): MessageStatus!
    }
    type User {
        username: String!
        password: String!
        email: String!
        avatar: String
    }
    type MessageStatus {
       status: Boolean!
       msg: String!
    }
`;
