import React from "react";

function Status(props) {
  const {color, title} = props;
  return (
    <span
      style={{
        padding: "10px",
        backgroundColor: color,
        fontWeight: "900",
        fontSize: "12px",
        borderRadius:"5px"
      }}
    >
      {title}
    </span>
  );
}

export default Status;
