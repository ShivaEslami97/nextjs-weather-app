import Layout from "@/components/Layout";
import Image from "next/image";
import searchIcon from "@/public/search_magnifier_mobile ui_zoom_icon.svg";
import elgoli from "@/public/elgoli.svg";
import weatherImage from "@/public/weather.svg";
import InputContainer from "@/components/InputContainer";

const Weather = () => {
  return (
    <Layout title="weather App" className="w-1/4">
      <InputContainer
        className="w-full"
        type="text"
        placeholder="Tabriz, Iran"
        iconAlt="search icon"
        iconsrc={searchIcon}
      />
      <Image src={weatherImage} alt="weather image" width={150} height={150} />
      <h2 className="weather__temp">30 °C</h2>
      <Image src={elgoli} alt="" className="weather__bg" />
    </Layout>
  );
};

export default Weather;
