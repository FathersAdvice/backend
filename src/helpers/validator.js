export const validator = (checkedValue, fieldName) => {
  let validStatus;
  switch (fieldName) {
    case "email":
      const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      validStatus = {
        valid: regExp.test(checkedValue),
        msg: "Please write correct email [a-z]@[a-z].[a-z]",
      };
      break;
    default:
      validStatus = {
        valid: checkedValue?.length > 0,
        msg: "The field can't be empty",
      };
  }
  return validStatus;
};
