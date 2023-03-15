import Layout from "@/components/Layout";
import { getSession, signOut } from "next-auth/react";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import SearchBar from "@/components/SearchBar";
import { API_KEY, BASE_URL, fetchData } from "@/lib/weather-services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { WeatherData } from "@/models/customTypes";
import WeatherResult from "@/components/WeatherResult";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";

const Weather: NextPage = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [city, setCity] = useState("Tabriz");
  const [tempIsLow, setTempIsLow] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getWeatherData = async () => {
      if (city.trim().length > 0) {
        setIsloading(true);
        try {
          //Fetch weather data and update the state
          const weather: WeatherData = await fetchData(
            `${BASE_URL}weather?q=${city}&limit=6&appid=${API_KEY}&units=metric`
          );

          setCurrentWeather(weather);
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message || "Something went wrong!");
          }
        }
        setIsloading(false);
      }
    };
    getWeatherData();
  }, [city]);

  useEffect(() => {
    // Update the background image based on the weather condition
    if (currentWeather) {
      const temp = +currentWeather?.main.temp.toFixed();
      if (temp < 3) {
        setTempIsLow(true);
      } else {
        setTempIsLow(false);
      }
    }
  }, [currentWeather]);

  // handles the logout process by clearing the session and redirecting to the login page.
  function logoutHandler() {
    const data = signOut({ redirect: false, callbackUrl: "/" });
    data.then((res) => {
      // Redirect to the login page.
      router.push(res.url);
    });
  }

  // Determine the appropriate background image class based on the temperature.
  const cardBg = tempIsLow ? "bg-tempLow" : "bg-tempHigh";

  // A default content for when no weather data has been found yet.
  let weatherResultContent = <Loading />;
  if (!isLoading && !currentWeather) {
    weatherResultContent = <p className="py-5">Nothing Found!</p>;
  }
  if (!isLoading && currentWeather) {
    weatherResultContent = <WeatherResult weatherData={currentWeather} />;
  }

  return (
    <Layout
      title="Weather App"
      className={`w-3/4 ${cardBg} bg-cover bg-card bg-blend-overlay lg:w-1/4`}
    >
      <div className="weather">
        <SearchBar onCityChange={setCity} />
        {weatherResultContent}
        <button
          className="btn btn__secondary"
          onClick={logoutHandler}
          type="button"
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  // enforce authentication for "weather" route.
  if (!session) {
    return {
      redirect: {
        destination: "/unauthenticated",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default Weather;
