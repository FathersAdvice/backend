import React from "react";
import { writeFile } from "../graphql-server/server";

export default (props) => {
  writeFile();
  return <div>Graph-QL-server</div>;
};
