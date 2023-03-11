import Image from "next/image";
import emailIcon from "@/public/email_envelope_mail_send_icon.svg";
import lockIcon from "@/public/lock_locker_icon.svg";
import { useState } from "react";
import InputContainer from "./InputContainer";

const AuthForm = () => {
  const [isLogin, setIslogin] = useState(true);
  const switchAuthModeHandler = () => {
    setIslogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <form className="auth__form">
      <InputContainer
        type="email"
        placeholder="Please enter your email ..."
        iconAlt="email icon"
        iconsrc={emailIcon}
      />
      <InputContainer
        type="password"
        placeholder="Please enter your password"
        iconAlt="lock icon"
        iconsrc={lockIcon}
      />
      {!isLogin && (
        <InputContainer
          type="password"
          placeholder="Confirm your password"
          iconAlt="lock icon"
          iconsrc={lockIcon}
        />
      )}
      <button className="auth__btn">
        {isLogin ? "Login" : "Create Account"}
      </button>
      <div className="auth__mode">
        {isLogin ? "Dont you have an account?" : "Login with existing account"}
        <button
          type="button"
          className="text-primary ml-2"
          onClick={switchAuthModeHandler}
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
