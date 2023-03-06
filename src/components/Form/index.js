import React, { useEffect, useMemo, useState } from "react";
import classname from "classname";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { validator } from "../../helpers/validator";
import Input from "../Input";
import { darkThemeColor, lightThemeColor } from "../../theme/color/constants";
import { keyGenerateForMap } from "../../helpers/generate";

const styles = makeStyles((theme) => {
  const themeData = theme === "dark" ? darkThemeColor : lightThemeColor;
  return {
    FormContainer: {
      backgroundColor: themeData.totalColor,
      color: themeData.text,
      padding: "40px 20px",
      boxSizing: "border-box",
      borderRadius: "3px",
      zIndex: 100,
      display: "flex",
      flexDirection: "column",
    },
    inputForm: {
      marginTop: "5px !important",
      fontSize: "15px",
    },
    FormTitle: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginBottom: "30px",
    },
    SendButton: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "30px",
      "& .button": {
        cursor: "pointer",
        position: "relative",
        right: "-20px",
        width: "calc(50% + 20px)",
        padding: "0 20px",
        "border-top-left-radius": "4px",
        "border-bottom-left-radius": "4px",
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
        height: "50px",
        "&:hover": {
          backgroundColor: "#4E9F3D",
          transition: "0.5s",
        },
        "& span": {
          marginRight: "5px",
        },
      },
    },
    SendDisabled: {
      pointerEvents: "none",
    },
  };
});

const Form = ({
  classes,
  inputComponents,
  FormFooterBlock,
  themeColor,
  onSubmit,
  title,
}) => {
  const style = styles(themeColor);
  const [fieldForm, setFieldForm] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [validForm, setValidForm] = useState({});

  const InputComponents = useMemo(() => {
    return (
      inputComponents.length > 0 &&
      inputComponents.map(
        (
          {
            label,
            placeholder = "Enter",
            variant = "standard",
            confirm = false,
          },
          index
        ) => {
          return (
            <Input
              key={keyGenerateForMap(index)}
              label={label}
              value={fieldForm[label]}
              variant={variant}
              placeholder={placeholder}
              confirm={confirm}
              setFieldForm={setFieldForm}
              classname={style.inputForm}
            />
          );
        }
      )
    );
  }, [inputComponents]);

  useEffect(() => {
    InputComponents.forEach(({ props: { label } }) => {
      if (fieldForm[label]) {
        const { valid, msg } = validator(fieldForm[label], label);
        setValidForm((prevState) => ({
          ...prevState,
          [label]: { valid, msg },
        }));
      } else {
        setValidForm((prevState) => ({ ...prevState, [label]: false }));
      }
    });
  }, [fieldForm, setFieldForm, InputComponents]);
  console.log(validForm);
  useEffect(() => {
    let converValidStatusToInt = false;
    let countField = Object.keys(validForm).length;
    for (const [_, { valid = false }] of Object.entries(validForm)) {
      converValidStatusToInt += valid;
    }
    setDisabled(converValidStatusToInt !== countField);
  }, [validForm, setValidForm]);
  return (
    <div className={classname(classes, style.FormContainer)}>
      <div className={style.FormTitle}>{title}</div>
      {InputComponents}
      <div
        className={
          disabled
            ? classname(style.SendDisabled, style.SendButton)
            : style.SendButton
        }
      >
        {FormFooterBlock ? (
          <FormFooterBlock />
        ) : (
          <div className="button" onClick={() => onSubmit(fieldForm)}>
            <span>SEND</span>
            <IconButton>
              <SendIcon sx={{ color: "white" }} />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

Form.propTypes = {
  classes: PropTypes.string,
  title: PropTypes.string,
  inputComponents: PropTypes.arrayOf(PropTypes.node),
  FormFooterBlock: PropTypes.node,
  themeColor: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
Form.defaultProps = {
  classes: [],
  title: "Form",
  inputComponents: [],
  FormFooterBlock: undefined,
  themeColor: "light",
};
export default Form;
