import { readFile, writeFile, updateFile } from './crud';
import { cryptoPassword } from '../helpers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const APP_SECRET = 'GraphQL-is-aw3some';
const KEY_DB = 'users';

const statusCompilation = (throwMessage, status = false) => ({ msg: throwMessage, status });

const resolvers = {
    Query: {
        getUsers: (_, arg, context) => readFile(KEY_DB),
    },
    Mutation: {
        signup: async (_, arg, context) => {
            const { username, password, email, avatar } = arg;
            const newUser = { username, password: await cryptoPassword(password), email };
            if (avatar) {
                newUser.avatar = avatar;
            }
            const messageStatus = writeFile("db.json", newUser, KEY_DB);
            const token = jwt.sign({ userId: newUser.id }, APP_SECRET)
            return { ...messageStatus, token }
        },
        login: async (_, arg, context) => {
            const foundUser = readFile(KEY_DB).find(user => user.email === arg.email);
            if (!foundUser) return statusCompilation('Don`t found user');
            const validPassword = await bcrypt.compare(arg.password, foundUser.password);
            if (!validPassword) return statusCompilation('Password is invalid ');
            const token = jwt.sign({ userId: foundUser.id }, APP_SECRET);
            const StatusMessage = statusCompilation('Successful connection', true);
            return {
                ...StatusMessage,
                token,
                user: foundUser
            }
        },
        removeUser: (_, arg, context) => {
            const { id } = arg;
            return updateFile(KEY_DB, 'delete', parseInt(id), KEY_DB);
        },
        changeUser: async (_, { id, ...arg }, context) => {
            const { password } = arg;
            if (password) {
                arg.password = await cryptoPassword(password)
            }
            return updateFile(KEY_DB, 'put', parseInt(id), arg);
        }
    }
}


export default resolvers;