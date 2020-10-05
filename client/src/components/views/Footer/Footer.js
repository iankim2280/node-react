import React from "react";
import { withRouter } from "react-router-dom";

const Footer = () => {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
        borderTop: "1px solid black",
      }}
    >
      <p>footer</p>
    </div>
  );
};

export default withRouter(Footer);
