import userResolver from './userResolver';
import adviceResolver from './adviseResolver';

const resolvers = {
  Query: {
    ...userResolver.query,
  },
  Mutation: {
    ...userResolver.mutation,
  },
};
console.log({resolvers});
export default resolvers;