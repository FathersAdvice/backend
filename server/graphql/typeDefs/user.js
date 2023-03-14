import gql from "graphql-tag";

export default gql`
    type Query {
        getUsers: [User]
    }
    type Mutation { 
        signup(username: String!, email: String!, password: String!, avatar: String): MessageStatus!
        login(email: String!, password: String!): MessageStatus!
        removeUser(id: ID!): MessageStatus!
        changeUser(id: ID!, username: String, email: String, password: String, avatar: String): MessageStatus!
    }
`;