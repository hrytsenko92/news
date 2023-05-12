import { ChangeEvent, FC, Suspense, lazy, useState } from "react";
import { TodayWeather } from "../../components/weather/todayWeather/TodayWeather";
import { findLocation } from "../../loaders/getLocation";
import { apiLoader } from "../../loaders/apiLoader";
import { OneDayWeatherType } from "../../types/oneDayWeatherType";
import { FiveDayWeatherType } from "../../types/fiveDayWeatherType";
import { FormWeather } from "../../components/weather/formWeather/FormWeather";
import { FiveDayWeather } from "../../components/weather/FiveDayWeather";
import style from "./weather.module.scss";

export const Weather: FC = () => {
  const [city, setCity] = useState<string>("");
  const [oneDayData, setOneDayData] = useState<OneDayWeatherType>();
  const [fiveDayData, setFiveDayData] = useState<FiveDayWeatherType>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cityCords = await apiLoader(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`
    );
    const oneDayWeather = await apiLoader(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cityCords[0].lat}&lon=${cityCords[0].lon}&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`
    );
    const fiveDayWeather = await apiLoader(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${cityCords[0].lat}&lon=${cityCords[0].lon}&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`
    );
    setOneDayData(oneDayWeather);
    setFiveDayData(fiveDayWeather);
    setCity("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTimeout(() => {
      setCity(value);
    }, 100);
    // check for null/undefined and str.find
  };
  const clearInput = () => { setCity('')}

  const findByLocation = async () => {
    const res = await findLocation();
    setOneDayData(res.oneDayWeather);
    setFiveDayData(res.fiveDayWeather);
  };
// console.log(oneDayData)
// console.log(fiveDayData)
  return (
    <Suspense fallback={<p>Loading...</p>}>
          <div className={style.weatherContainer}>
      <FormWeather
        handleSubmit={handleSubmit}
        cityName={city}
        clearInput={clearInput}
        handleChange={handleChange}
        findByLocation={findByLocation}
      />
      {/* {oneDayData !== undefined ? (
        <TodayWeather oneDayData={oneDayData} />
      ) : null} 
       {fiveDayData !== undefined ? (
        <FiveDayWeather fiveDayData={fiveDayData} />
      ) : null} */}
    </div>
    </Suspense>

  );
};
