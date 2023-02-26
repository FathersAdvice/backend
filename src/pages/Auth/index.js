import React, { useState } from "react";
import { Footer, Logo, Form } from "../../components";
import { FormContext } from "../../context";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_USER, GET_USERS } from "../../graphql-server/service";
import styles from "./index.module.css";

export default (props) => {
  const [fieldValue, setFieldValue] = useState([]);
  const [addUser, { _, loading, error }] = useMutation(ADD_USER);
  const onSubmit = async (fieldValue) => {
    const dataSubmit = await addUser({
      variables: {
        username: fieldValue.username,
        email: fieldValue.email,
        password: fieldValue.password,
        avatar: null,
      },
    });
  };
  const inputComponents = [
    {
      label: "email",
      placeholder: "Enter your email",
      variant: "standard",
      confirm: false,
    },
    {
      label: "username",
      placeholder: "Enter your username",
      variant: "standard",
      confirm: false,
    },
    {
      label: "password",
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
          <Form
            classes={styles.formAuth}
            inputComponents={inputComponents}
            onSubmit={onSubmit}
          />
        </div>
        <Footer />
      </div>
    </FormContext.Provider>
  );
};
