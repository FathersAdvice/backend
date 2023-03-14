import fs from "fs";
import {
  formatterData,
  getFilename,
  checkUniqElements,
} from "../helpers";

const readFile = (key) => {
  const data = fs.readFileSync(getFilename("db.json"), "utf-8");
  return JSON.parse(data)[key];
};

const updateFile = (key, action, id, data) => {
  let status;
  const exsistFile = readFile(key);
  let newData;
  const foundData = exsistFile.find((d) => d.id === id);
  switch (action) {
    case "put":
      if (foundData) {
        let dataRaw;
        Object.entries(data).forEach(([field, value]) => {
          dataRaw = { [key]: [...exsistFile.filter(d => d.id !== id), { ...foundData, [field]: value }] };
        });
        fs.writeFileSync(getFilename("db.json"), JSON.stringify(dataRaw));
        status = { msg: "Successful data change put!", status: true, user: foundData };
        break;
      }
      status = { msg: "Not found data in db!", status: false };
      break;
    case "delete":
      if (foundData) {
        newData = JSON.stringify({
          [key]: [...exsistFile.filter((d) => d.id !== id)],
        });
        fs.writeFileSync(getFilename("db.json"), newData);
        status = { msg: "Successful data change delete!", status: true, user: foundData };
        break;
      }
      status = { msg: "Not found data in db!", status: false };
      break;
  }
  return status;
};
const writeFile = (filename, data, key) => {
  let status;
  const prevData = readFile(key);
  if (prevData) {
    const onCopyStatus = checkUniqElements(prevData, data);
    if (onCopyStatus) {
      return { msg: "Copy", status: false };
    }
  }
  const dataSaved = formatterData(prevData, data, key);
  try {
    fs.writeFileSync(getFilename(filename), dataSaved);
    status = { msg: "Success write to db", status: true, user: data };
  } catch (e) {
    status = { msg: "Error the write file", status: false };
  }
  return status;
};

export { writeFile, readFile, updateFile };