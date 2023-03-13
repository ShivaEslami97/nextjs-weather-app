export interface FormData {
  enteredEmail?: string;
  enteredPassword?: string;
  enteredConfirmPassword?: string;
}

export type User = {
  enteredEmail?: string;
  enteredPassword?: string;
};

export type RegisterResponse = {
  message: string;
};

export type Password = {
  enteredPassword: string;
  userPassword: string;
};
export type WeatherData = {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
};
