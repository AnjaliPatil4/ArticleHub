import React from "react";
import Notes from "./Notes";
//import GetUser from "./GetUser";
const PersonalDashboard = (props) => {
  console.log("1");
  console.log(props);
  return (
    <div>
      <Notes showAlert={props.showAlert} />
      {/* <GetUser /> */}
    </div>
  );
};

export default PersonalDashboard;
