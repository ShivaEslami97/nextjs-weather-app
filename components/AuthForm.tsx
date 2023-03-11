import Image from "next/image";
import emailIcon from "@/public/email_envelope_mail_send_icon.svg";
import lockIcon from "@/public/lock_locker_icon.svg";

const AuthForm = () => {
  return (
    <form className="auth__form">
      <div className="auth__input-container">
        <Image width={25} height={25} src={emailIcon} alt="email icon" />
        <input
          type="email"
          className="auth__input"
          placeholder="Please enter your email ..."
        />
      </div>
      <div className="auth__input-container">
        <Image width={25} height={25} src={lockIcon} alt="lock icon" />
        <input
          type="email"
          className="auth__input"
          placeholder="Please enter your password"
        />
      </div>
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
