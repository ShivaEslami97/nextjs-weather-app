import AuthForm from "@/components/AuthForm";
import Layout from "@/components/Layout";
import Image from "next/image";
import weatherIcon from "@/public/weather-icon.png";
import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    // redirect the user to the "/weather" page when a session is found
    getSession().then((session) => {
      if (session) {
        router.replace("/weather");
      } else {
        console.log("No session");
      }
    });
  }, [router, status]);

  return (
    <>
      <Layout title="weather App login page" className="w-3/4 lg:w-1/2">
        <div className="flex flex-col gap-2 items-center">
          <Image
            className="app-logo"
            priority
            src={weatherIcon}
            alt="weather icon"
          />
          <h3 className="text-2xl">Welcome!</h3>
        </div>
        <AuthForm />
      </Layout>
    </>
  );
}
