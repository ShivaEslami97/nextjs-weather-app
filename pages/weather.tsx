import Layout from "@/components/Layout";
import Image from "next/image";
import searchIcon from "@/public/search_magnifier_mobile ui_zoom_icon.svg";
import elgoli from "@/public/elgoli.svg";
import weatherImage from "@/public/weather.svg";
import InputContainer from "@/components/InputContainer";
import { getSession, signOut } from "next-auth/react";
import { NextPage } from "next";
import { GetServerSideProps } from "next";

const Weather: NextPage = (): JSX.Element => {
  function logoutHandler() {
    signOut({ callbackUrl: "/" });
  }

  return (
    <Layout title="weather App" className="w-1/4">
      <div className="w-full flex flex-col justify-center items-center relative z-10 text-center">
        <InputContainer
          className="w-full"
          type="text"
          placeholder="Tabriz, Iran"
          iconAlt="search icon"
          iconsrc={searchIcon}
        />
        <Image
          src={weatherImage}
          alt="weather image"
          className="mx-auto"
          width={150}
          height={150}
        />
        <h2 className="weather__temp">30 °C</h2>
        <button
          className="text-primary text-base mt-5 p-2 mr-auto border border-primary rounded-sm"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
      <Image src={elgoli} alt="" className="weather__bg" />
    </Layout>
  );
};

export default Weather;
