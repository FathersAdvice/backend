import gql from "graphql-tag";

export default gql`
    type Query {
        getUsers: [User]
    }
    type Mutation { 
        addUser(username: String!, email: String!, password: String!, avatar: String): MessageStatus!
        removeUser(id: ID!): MessageStatus!
        changeUser(id: ID!, username: String, email: String, password: String, avatar: String): MessageStatus!
    }
`;