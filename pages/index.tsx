import Image from "next/image";
import weatherIcon from "@/public/weather-icon.png";
import emailIcon from "@/public/email_envelope_mail_send_icon.svg";
import lockIcon from "@/public/lock_locker_icon.svg";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <>
      <Layout title="weather App loging page" className="w-5/6">
        <div className="flex flex-col gap-2 items-center">
          <Image className="app-logo" src={weatherIcon} alt="weather icon" />
          <h3>Welcome!</h3>
        </div>
        <form className="login__form">
          <div className="login__input-container">
            <Image width={25} height={25} src={emailIcon} alt="email icon" />
            <input
              type="email"
              className="login__input"
              placeholder="Please enter your email ..."
            />
          </div>
          <div className="login__input-container">
            <Image width={25} height={25} src={lockIcon} alt="lock icon" />
            <input
              type="email"
              className="login__input"
              placeholder="Please enter your password"
            />
          </div>
          <button className="login__btn">Login</button>
          <div className="login__register">
            Dont you have an account?
            <a className="text-primary ml-2" href="#">
              Sign Up
            </a>
          </div>
        </form>
      </Layout>
    </>
  );
}
