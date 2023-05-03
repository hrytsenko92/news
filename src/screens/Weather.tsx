import { ChangeEvent, FC, Suspense, useState } from "react";
import { TodayWeather } from "../components/weather/todayWeather";
import { getLocation } from "../api/getLocation";
import { apiLoader } from "../api/apiLoader";
import { OneDayWeatherType } from "../types/oneDayWeatherType";
import { FiveDayWeatherType } from "../types/fiveDayWeatherType";

export const Weather: FC = () => {
  const [city, setCity] = useState<string>("");
  const [oneDayData, setOneDayData] = useState<OneDayWeatherType>();
  const [fiveDayData, setFiveDayData] = useState<FiveDayWeatherType>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cityCords = await apiLoader(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`);
    const oneDayWeather = await apiLoader(`https://api.openweathermap.org/data/2.5/weather?lat=${cityCords[0].lat}&lon=${cityCords[0].lon}&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`);
    const fiveDayWeather = await apiLoader(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityCords[0].lat}&lon=${cityCords[0].lon}&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`);
    setOneDayData(oneDayWeather)
    setFiveDayData(fiveDayWeather)
    setCity('');
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
    const oneDayWeather = await apiLoader(`https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`);
    const fiveDayWeather = await apiLoader(`https://api.openweathermap.org/data/2.5/forecast?lat=${location?.latitude}&lon=${location?.longitude}&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`);
    setOneDayData(oneDayWeather)
    setFiveDayData(fiveDayWeather)
  }
console.log(oneDayData);
console.log(fiveDayData);

  return (
    <div className="container">
      <section className="formSection">
        <form className="formWrapper" onSubmit={handleSubmit}>
          <input className="formInput" type="text" placeholder="Enter city name..." value={city} onChange={handleChange} />
          <input className="formSubmit" type="submit" />
          <button className="formLocationbtn" onClick={findByLocation}>find by location</button>
        </form>
      </section>
      <div className="weatherTodayWrapper"></div>
      <div className="weatherChartWrapper"></div>
    </div>
  );
};
