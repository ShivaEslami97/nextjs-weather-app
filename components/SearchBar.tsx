import InputContainer from "./InputContainer";
import searchIcon from "@/public/search_magnifier_mobile ui_zoom_icon.svg";
import SearchSuggestions from "./SearchSuggestions";
import { useEffect, useState } from "react";
import { LoadedCities, Cities } from "@/models/customTypes";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { API_KEY, fetchData, GEO_API_URL } from "@/lib/weather-services";
import LoadingSpinner from "./Loading/LoadingSpinner";

type Props = {
  onCityChange: (value: string) => void;
};

const SearchBar = ({ onCityChange }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<LoadedCities[]>([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const debouncedGetCitySuggestions = debounce(async () => {
      if (searchValue.length > 2) {
        setIsloading(true);
        try {
          // fetch cities from api base on entered value
          const cities: Cities[] = await fetchData(
            `${GEO_API_URL}q=${searchValue}&limit=6&appid=${API_KEY}`
          );

          // transform data
          const loadedCities = cities.map((city) => {
            return {
              country: `${city.country}`,
              name: `${city.name}`,
            };
          });

          setCitySuggestions([...loadedCities]);
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message || "Something went wrong!");
          }
        }
        setIsloading(false);
      } else {
        setCitySuggestions([]);
      }
    }, 1000);
    debouncedGetCitySuggestions();
  }, [searchValue]);

  const handleSuggestionOnClick = (val: string) => {
    setCitySuggestions([]);
    setSearchValue("");
    onCityChange(val);
  };

  return (
    <div className="w-full">
      <div className="flex gap-1">
        <InputContainer
          className="capitalize"
          type="text"
          placeholder="Enter a city name..."
          iconAlt="search icon"
          iconsrc={searchIcon}
          value={searchValue}
          onChangedHandler={setSearchValue}
          onBlurHandler={() => {
            setTimeout(() => {
              setCitySuggestions([]);
            }, 200);
          }}
        />
        {isLoading && <LoadingSpinner />}
      </div>

      {citySuggestions.length > 0 && (
        <SearchSuggestions
          onCityClickHandler={handleSuggestionOnClick}
          cityOptions={citySuggestions}
        />
      )}
    </div>
  );
};

export default SearchBar;
