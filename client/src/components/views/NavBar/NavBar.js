import React from "react";
import { withRouter } from "react-router-dom";
import "../../../App.css";
import { Menu } from "antd";

const NavBar = () => {
  return (
    // <nav className="menu">
    //   <div className="menu_left">Register </div>
    //   <div className="menu_right">Login</div>
    // </nav>
    <Menu className="menu">
      <Menu.Item className="menu_left" key="register">
        <a href="/register">Register</a>
      </Menu.Item>
      <Menu.Item className="menu_right" key="login">
        <a href="/login">Login</a>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(NavBar);
