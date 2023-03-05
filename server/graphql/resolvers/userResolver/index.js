import { readFile, writeFile, updateFile } from '../crud';
import  { cryptoPassword } from '../../helpers';

export default  {
  query: {
    getUsers: () => readFile('users')
  },
  mutation: {
    addUser: async (_, arg) => {
      const { username, password, email, avatar } = arg;
      const newUser = { username, password: await cryptoPassword(password), email };
      if (avatar) {
        newUser.avatar = avatar;
      }
      return writeFile("db.json", newUser, "users");
    },
    removeUser: (_, arg) => {
      const { id } = arg;
      return updateFile('users', 'delete', parseInt(id), 'users');
    },
    changeUser: async (_, { id, ...arg }) => {
      const { password } = arg;
      if(password) {
        arg.password = await cryptoPassword(password)
      }
      return updateFile('users', 'put', parseInt(id), arg);
    }
  }
}