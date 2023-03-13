import gql from "graphql-tag";

export default gql`
    type Advice {
        id: ID
        author: User!
        title: String!
        describe: String
        date_time_creater: String
        date_time_update: String
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