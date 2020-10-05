import React from "react";
import "./App.css";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        {/* <div className="App"></div> */}
        {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, null)} />
          <Route exact path="/register" component={Auth(RegisterPage, null)} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

// rfac = generate an arrow function and export right away
// rface = generate an arrow function and export separately
