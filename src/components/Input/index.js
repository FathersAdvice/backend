import React, { useContext } from "react";
import { capitalize } from "lodash";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const Input = ({
  label,
  variant,
  placeholder,
  onChange,
  confirm,
  setFieldForm,
  value,
  color,
  classname,
}) => {
  const onChangeHandler = ({ target: { value } }) => {
    setFieldForm((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };
  return (
    <TextField
      id="standard-basic"
      label={capitalize(label)}
      variant={variant}
      value={value}
      className={classname}
      placeholder={placeholder}
      onChange={onChange || onChangeHandler}
      type={confirm ? "password" : "text"}
      color={color}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
  placeholder: PropTypes.string,
  confirm: PropTypes.bool,
  onChange: PropTypes.func,
  classname: PropTypes.string,
  color: PropTypes.oneOf([
    "success",
    "primary",
    "secondary",
    "error",
    "warning",
  ]),
};

Input.defaultProps = {
  placeholder: "",
  classname: "",
  label: undefined,
  variant: "Standard",
  confirm: false,
  onChange: undefined,
  color: "success",
};

export default Input;
