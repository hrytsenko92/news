import { ChangeEvent, FC, useState } from "react";
import { Loading } from "../../components/loading/Loading";
import { TodayWeather } from "../../components/weather/todayWeather/TodayWeather";
import { getLocation } from "../../loaders/getLocation";
import { apiLoader } from "../../loaders/apiLoader";
import { OneDayWeatherType } from "../../types/oneDayWeatherType";
import { FormWeather } from "../../components/weather/formWeather/FormWeather";
import style from "./weather.module.scss";

export const Weather: FC = () => {
  const [city, setCity] = useState<string>("");
  const [oneDayData, setOneDayData] = useState<OneDayWeatherType>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (city.match(/^[a-zA-Z]{4,}$/)) {
      const cityCords = await apiLoader(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&units=metric&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      const oneDayWeather = await apiLoader(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          cityCords[0].lat
        }&lon=${cityCords[0].lon}&units=metric&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      setOneDayData(oneDayWeather);
      setCity("");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTimeout(() => {
      setCity(value);
    }, 100);
  };

  const findByLocation = async () => {
    setLoading(true);
    const location = await getLocation();
    const oneDayWeather: OneDayWeatherType = await apiLoader(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        location?.latitude
      }&lon=${location?.longitude}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    );
    setOneDayData(oneDayWeather);
    setLoading(false);
  };

  const clearInput = () => {
    setCity("");
  };

  return (
    <div className={style.container}>
      <FormWeather
        handleSubmit={handleSubmit}
        cityName={city}
        clearInput={clearInput}
        handleChange={handleChange}
        findByLocation={findByLocation}
      />
      {!loading && oneDayData?.cod === 200 ? (
        <TodayWeather oneDayData={oneDayData} />
      ) : loading ? (
        <Loading />
      ) : null}
    </div>
  );
};
