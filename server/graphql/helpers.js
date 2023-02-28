import pathModule from "path";
import * as crypto from "crypto";
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

export const checkUniqElements = (dataExsist, data) => {
  const keys = Object.keys(data).filter(
    (key) => !NON_UNIQ_FIELD_DATA.includes(key)
  );
  return onCheckField(dataExsist, keys, data);
};

export const cryptoPassword = (password) =>
  crypto.createHmac("sha256", password).digest("hex");

export const getFilename = (path) =>
  pathModule.resolve(__dirname, `db/${path}`);

export const formatterData = (prevData, data, key) => {
  prevData = prevData[key]
    ? { [key]: [...prevData[key], data] }
    : { [key]: [data] };
  return JSON.stringify(prevData);
};
