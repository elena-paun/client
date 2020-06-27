import React from "react";

export const Message = (props) => (
  <div style={{ background: "#eee" }}>
    <p>
      <strong>{props.user}</strong> says:
    </p>
    <p>{props.message} </p>
  </div>
);
