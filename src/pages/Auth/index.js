import React, { useState } from "react";
import { Footer, Logo, Form } from "../../components";
import { FormContext } from "../../context";

import styles from "./index.module.css";

export default (props) => {
  const [fieldValue, setFieldValue] = useState([]);
  const inputComponents = [
    {
      label: "Email",
      placeholder: "Enter your email",
      variant: "standard",
      confirm: false,
    },
    {
      label: "Username",
      placeholder: "Enter your username",
      variant: "standard",
      confirm: false,
    },
    {
      label: "Password",
      placeholder: "Enter your password",
      variant: "standard",
      confirm: true,
    },
  ];
  return (
    <FormContext.Provider value={[fieldValue, setFieldValue]}>
      <div className={styles.authContainer}>
        <div className={styles.authBody}>
          <Logo />
          <Form classes={styles.formAuth} inputComponents={inputComponents} />
        </div>
        <Footer />
      </div>
    </FormContext.Provider>
  );
};
