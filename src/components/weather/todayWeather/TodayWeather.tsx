import { OneDayWeatherType } from "../../../types/oneDayWeatherType";
import style from "./fiveDayWeather.module.scss";
import { format } from 'date-fns'

type TodayWeatherProps = {
  oneDayData: OneDayWeatherType;
};

export const TodayWeather = ({ oneDayData }: TodayWeatherProps) => {

  const dayFormated = () => {
    return format(new Date(), 'do LLLL yyyy')
  };
  const timeFormated = (i: Date) => {
     return format(new Date(i), 'HH:mm')
  };
  console.log(dayFormated)
  return (
    <section className={style.container}>
      <div className={style.top}>
        <span className={style.name}>{oneDayData.name}</span>
        <span className={style.date}>{dayFormated()}</span>
      </div>
      <div className={style.mid}>
        <div className={style.midLeft}>
          <img
            className={style.skyIMG}
            src={`https://openweathermap.org/img/wn/${oneDayData.weather[0]["icon"]}@2x.png`}
          />
        </div>
        <div className={style.midRight}>
          <span className={style.temp}>{`${oneDayData.main.temp.toFixed(
            1
          )}\xB0`}</span>
          <span
            className={style.feelsLike}
          >{`Feels like ${oneDayData.main.feels_like.toFixed(1)}\xB0`}</span>
        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.bottomLeft}>
          <span
            className={style.wind}
          >{`Wind speen ${oneDayData.wind.speed} m/s`}</span>
          <span
            className={style.pressure}
          >{`Pressure ${oneDayData.main.pressure} hPa`}</span>
        </div>
        <div className={style.bottomLRight}>
          <span className={style.sunrise}>{`Sunrise ${timeFormated(
            new Date(oneDayData.sys.sunrise * 1000)
          )}`}</span>
          <span className={style.sunset}>{`Sunset ${timeFormated(
            new Date(oneDayData.sys.sunset * 1000)
          )}`}</span>
        </div>
      </div>
    </section>
  );
};
