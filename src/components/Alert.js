import React from "react";

export default function Alert(props) {
  const capitalize = (word) => {
    if (word === "danger") {
      return "Error";
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <div style={{ height: "70px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.typ} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(props.alert.typ)}</strong>:{props.alert.message}
        </div>
      )}
    </div>
  );
}
