import { useDispatch } from "react-redux";
// import Axios from "axios";
import React, { useEffect } from "react";
import { auth } from "../_actions/user_action";

export default function (SpecificCompononet, option, adminRoute = null) {
  // option = null => anyone can access, true => only loggedin users can access, false => loggedin users cannot access

  const AuthenticationCehck = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((res) => {
        console.log(res);
        // not loggedin
        if (!res.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          // loogedin
          if (adminRoute && !res.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
      // Axios.get('/api/users/auth')
    }, []);
    return <SpecificCompononet />;
  };
  return AuthenticationCehck;
}
