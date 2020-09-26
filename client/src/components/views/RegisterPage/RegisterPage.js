import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { registerUser } from "../../../_actions/user_action";

const RegisterPage = (props) => {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  // e is for event
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onFirstNameNameHandler = (e) => {
    setFirstName(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
      firstname: FirstName,
      password: Password,
    };

    if (Password !== ConfirmPassword) {
      return alert("Password is different");
    }

    // if don't use Redux, use Axios for examble..=>
    // Axios.post('/api/users/register', body)

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        props.history.push("/login");
      } else {
        alert("Failed to register");
      }
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
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>First Name</label>
        <input
          type="text"
          value={FirstName}
          onChange={onFirstNameNameHandler}
        />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
