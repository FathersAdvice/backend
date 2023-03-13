import pathModule from "path";
import * as bcrypt from "bcrypt";
import sortBy from "lodash/sortBy";
import { NON_UNIQ_FIELD_DATA } from "./constants";

const onCheckField = (checkedObject, keys, checkObject) => {
  let dataCheckOnUniq;
  checkedObject.forEach((check) => {
    keys.forEach((key) => {
      if (dataCheckOnUniq) return;
      dataCheckOnUniq = check[key] === checkObject[key];
    });
  });
  return dataCheckOnUniq;
};

export const createID = (dataExsist) => {
  const lastElement = dataExsist.length - 1;
  if (dataExsist.length > 0) {
    return dataExsist[lastElement]["id"] + 1;
  }
  return 1;
};

export const checkUniqElements = (dataExsist, data) => {
  const keys = Object.keys(data).filter(
    (key) => !NON_UNIQ_FIELD_DATA.includes(key)
  );
  return onCheckField(dataExsist, keys, data);
};

export const cryptoPassword = async (password) =>
  await bcrypt.hash(password, 10);

export const getFilename = (path) =>
  pathModule.resolve(__dirname, `db/${path}`);

export const formatterData = (prevData, data, key) => {
  const id = createID(prevData || []);
  data.id = id;
  prevData = prevData
    ? { [key]: sortBy([...prevData, data], "id") }
    : { [key]: [data] };
  return JSON.stringify(prevData);
};
