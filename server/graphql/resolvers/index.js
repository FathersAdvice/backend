import userResolver from './userResolver';
import adviceResolver from './adviseResolver';
import _ from 'lodash';

const resolvers = {
  Query:
    _.merge(userResolver.query, adviceResolver.query),
  Mutation: {
    ...userResolver.mutation,
  },
};
console.log({ resolvers });
export default resolvers;