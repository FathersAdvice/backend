import { forEach } from "lodash";
export const convertSimpleFormat = (simpleType, unit = "px") =>
  simpleType + unit;

export const convertObjectFormat = (object, unit = "px") => {
  const convertedObject = {};
  forEach(object, (value, key) => (convertedObject[key] = value + unit));
  return convertedObject;
};
