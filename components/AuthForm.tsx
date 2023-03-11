import Image from "next/image";
import emailIcon from "@/public/email_envelope_mail_send_icon.svg";
import lockIcon from "@/public/lock_locker_icon.svg";
import InputContainer from "./InputContainer";

const AuthForm = () => {
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
      <button className="auth__btn">Login</button>
      <div className="auth__mode">
        Dont you have an account?
        <a className="text-primary ml-2" href="#">
          Sign Up
        </a>
      </div>
    </form>
  );
};

export default AuthForm;
