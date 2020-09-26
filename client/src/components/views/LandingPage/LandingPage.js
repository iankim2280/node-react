import React, { useEffect } from "react";
// import React, { Component, useEffect, useState } from "react";
import axios from "axios";

const LandingPage = () => {
  // const [Name, setName] = useState("");
  // using Hook
  useEffect(() => {
    axios.get("/api/hello").then((res) => console.log(res));
    // console.log(res.data));

    // axios.get("/api/hello").then((res) => setName(res.data.name));
  }, []);
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
      Index Page
    </div>
  );
};
export default LandingPage;

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
