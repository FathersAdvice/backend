import React from "react";
import sideLogo from "./img/space.jpg";
import Badge from "@mui/material/Badge";
import { PropTypes } from "prop-types";

import styles from "./index.module.css";

const ErrorPage = ({ error }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorTitleContainer}>
        <h1>Something wrong</h1>
        <Badge badgeContent={error.status} color="secondary" max={999}>
          Error
        </Badge>
      </div>
      <img className={styles.errorImages} src={sideLogo} />
    </div>
  );
};

ErrorPage.propTypes = {
  error: PropTypes.object,
};

ErrorPage.defaultProps = {
  error: { status: 404 },
};

export default ErrorPage;
