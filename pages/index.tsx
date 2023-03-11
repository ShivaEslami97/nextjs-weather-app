import Head from "next/head";
import Image from "next/image";
import weatherIcon from "@/public/weather-icon.png";
import emailIcon from "@/public/email_envelope_mail_send_icon.svg";
import lockIcon from "@/public/lock_locker_icon.svg";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <>
      <Layout title="weather App loging page">
        <div className="main__box">
          <div className="flex flex-col gap-2 items-center">
            <Image className="app-logo" src={weatherIcon} alt="weather icon" />
            <h3>Welcome!</h3>
          </div>
        </div>
      </Layout>
    </>
  );
}
