import React, { useEffect } from "react";
// import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const LandingPage = (props) => {
  // const [Name, setName] = useState("");
  // using Hook
  useEffect(() => {
    axios.get("/api/hello").then((res) => console.log(res));
    // console.log(res.data));

    // axios.get("/api/hello").then((res) => setName(res.data.name));
  }, []);
  const onClickHandler = () => {
    axios.get("/api/users/logout").then((res) => {
      if (res.data.success) {
        props.history.push("/login");
      } else alert("Failed to logout");
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div>Index Page</div>
      <button onClick={onClickHandler}>Logout</button>
    </div>
  );
};
export default withRouter(LandingPage);

// // using class component
// export default class LandingPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { name: "" };
//   }
//   // almost the same with useEffect
//   componentDidMount() {
//     axios.get("/api/hello").then((res) => {
//       this.setState({ name: res.data.name });
//     });
//   }
//   render() {
//     return <div>My name is {this.state.name}</div>;
//   }
// }
