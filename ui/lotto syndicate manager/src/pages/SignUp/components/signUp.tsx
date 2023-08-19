import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts";
import { NavigationRoutes } from "../../../constants";
import { signUpUser } from "../../../services/signUp";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = AuthContext.useLogin();

  const navigate = useNavigate();

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleFirstNameChange = (event: any) => {
    setFirstName(event.target.value);
  };
  const handleSecondNameChange = (event: any) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const Register = async (
    firstName: string,
    lastName: string,
    email: string,

    password: string
  ) => {
    const response = await signUpUser(firstName, lastName, email, password);
    if (response.status === 201) {
      const authDetails = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };

      localStorage.setItem("user", JSON.stringify(authDetails));

      dispatch({
        type: "authentication",
        ...authDetails,
      });
      navigate(NavigationRoutes.HOMEPAGE);
    }
    return response.data;
  };

  const handleRegister = () => {
    try {
      console.log(firstName + " " + lastName + " " + email + " " + password);
      Register(firstName, lastName, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <header>Register Page</header>
      <div className="box">
        <header>The Companion Tool</header>
        <div className="box">
          <div className="email">
            <input
              placeholder="Enter Email Address"
              value={email}
              onChange={handleEmailChange}
            ></input>
            <input
              placeholder="Enter Username"
              value={firstName}
              onChange={handleFirstNameChange}
            ></input>
            <input
              placeholder="Enter Username"
              value={lastName}
              onChange={handleSecondNameChange}
            ></input>
            <input
              placeholder="Enter Password"
              value={password}
              onChange={handlePasswordChange}
            ></input>
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
