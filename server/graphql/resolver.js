import fs from "fs";
import {
  formatterData,
  getFilename,
  cryptoPassword,
  checkUniqElements,
} from "./helpers";

const readUser = () => {
  const data = fs.readFileSync(getFilename("db.json"), "utf-8");
  return JSON.parse(data);
};

const writeFile = (filename, data, key) => {
  let status;
  const prevData = readUser();
  if (prevData[key]) {
    const onCopyStatus = checkUniqElements(prevData[key], data);
    if (onCopyStatus) {
      return { msg: "Copy", status: false };
    }
  }
  const dataSaved = formatterData(prevData, data, key);
  try {
    fs.writeFileSync(getFilename(filename), dataSaved);
    status = { msg: "Success write to db", status: true };
  } catch (e) {
    status = { msg: "Error the write file", status: false };
  }
  return status;
};

const resolvers = {
  Query: {
    getUsers: () => readUser().users,
  },
  Mutation: {
    addUser: async (_, arg) => {
      const { username, password, email, avatar } = arg;
      const newUser = { username, password: cryptoPassword(password), email };
      if (avatar) {
        newUser.avatar = avatar;
      }
      return writeFile("db.json", newUser, "users");
    },
  },
};

export default resolvers;
