import { ChangeEvent, FC, useState } from "react";
import { Loading } from "../../components/weather/Loading";
import { TodayWeather } from "../../components/weather/todayWeather/TodayWeather";
import { getLocation } from "../../loaders/getLocation";
import { apiLoader } from "../../loaders/apiLoader";
import { OneDayWeatherType } from "../../types/oneDayWeatherType";
import { FormWeather } from "../../components/weather/formWeather/FormWeather";
import style from "./weather.module.scss";

export const Weather: FC = () => {
  const [city, setCity] = useState<string>("");
  const [oneDayData, setOneDayData] = useState<OneDayWeatherType>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cityCords = await apiLoader(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`
    );
    const oneDayWeather = await apiLoader(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cityCords[0].lat}&lon=${cityCords[0].lon}&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`
    );
    setOneDayData(oneDayWeather);
    setCity("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTimeout(() => {
      setCity(value);
    }, 100);
    // check for null/undefined and str.find
  };

  const findByLocation = async () => {
    const location = await getLocation();
    const oneDayWeather: OneDayWeatherType = await apiLoader(`https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`);
    setOneDayData(oneDayWeather);
  };

  const clearInput = () => {
    setCity("");
  };
  return (
      <div className={style.weatherContainer}>
        <FormWeather
          handleSubmit={handleSubmit}
          cityName={city}
          clearInput={clearInput}
          handleChange={handleChange}
          findByLocation={findByLocation}
        />
        {oneDayData?.cod === 200 ? (
          <TodayWeather oneDayData={oneDayData} />
        ) : (
          <Loading />
        )}
      </div>
  );
};
