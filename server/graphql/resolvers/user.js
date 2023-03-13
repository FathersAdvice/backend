import { readFile, writeFile, updateFile } from './crud';
import { cryptoPassword } from '../helpers';

const resolvers = {
    Query: {
        getUsers: (_, arg, context) => {
            console.log({ context });
            return readFile('users');
        }
    },
    Mutation: {
        addUser: async (_, arg, context) => {
            const { username, password, email, avatar } = arg;
            const newUser = { username, password: await cryptoPassword(password), email };
            if (avatar) {
                newUser.avatar = avatar;
            }
            return writeFile("db.json", newUser, "users");
        },
        removeUser: (_, arg, context) => {
            const { id } = arg;
            return updateFile('users', 'delete', parseInt(id), 'users');
        },
        changeUser: async (_, { id, ...arg }, context) => {
            const { password } = arg;
            if (password) {
                arg.password = await cryptoPassword(password)
            }
            return updateFile('users', 'put', parseInt(id), arg);
        }
    }
}


export default resolvers;