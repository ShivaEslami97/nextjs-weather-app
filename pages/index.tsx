import AuthForm from "@/components/AuthForm";
import Layout from "@/components/Layout";
import Image from "next/image";
import weatherIcon from "@/public/weather-icon.png";

export default function Home() {
  return (
    <>
      <Layout title="weather App login page" className="w-1/2">
        <div className="flex flex-col gap-2 items-center">
          <Image className="app-logo" src={weatherIcon} alt="weather icon" />
          <h3 className="text-2xl">Welcome!</h3>
        </div>
        <AuthForm />
      </Layout>
    </>
  );
}
