import { useState } from "react";
import SignIn from "../../Features/sign-in/ui";
import SignUp from "../../Features/sign-up/ui";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Login = () => {
  const token = Cookies.get("token");

  const [isSignIn, setIsSignIn] = useState(true);

  const onSignChange = () => setIsSignIn(!isSignIn);

  if (token) {
    return <Navigate to="/main" replace />;
  }

  return (
    <div
      style={{
        width: window.innerWidth > 769 ? "100vh" : "",
        height: window.innerWidth > 769 ? "100vh" : "",
      }}
    >
      {isSignIn ? (
        <SignIn onSignChange={onSignChange} />
      ) : (
        <SignUp onSignChange={onSignChange} />
      )}
    </div>
  );
};

export default Login;
