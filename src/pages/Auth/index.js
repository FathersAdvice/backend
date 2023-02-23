import React from "react";
import { Footer, Logo } from "../../components";

import styles from "./index.module.css";

export default (props) => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authBody}>
        <Logo />
      </div>
      <Footer />
    </div>
  );
};
