import { readFile, writeFile, updateFile } from './crud';

const resolvers = {
    Query: {
        getAdvises: () => readFile('advice'),
    }
}

export default resolvers;