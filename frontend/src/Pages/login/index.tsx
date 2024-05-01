import { useState } from "react";
import SignIn from "../../Features/sign-in/ui";
import SignUp from "../../Features/sign-up/ui";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const onSignChange = () => setIsSignIn(!isSignIn);

  return isSignIn ? (
    <SignIn onSignChange={onSignChange} />
  ) : (
    <SignUp onSignChange={onSignChange} />
  );
};

export default Login;
