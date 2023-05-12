import { apiLoader } from "./apiLoader";
import { OneDayWeatherType } from "../types/oneDayWeatherType";
import { FiveDayWeatherType } from "../types/fiveDayWeatherType";
export interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}

export const getLocation = async (timeout = 5000): Promise<{ latitude: number; longitude: number } | null> => {
  if ("geolocation" in navigator) {
    try {
      const position = await new Promise<Position>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout });
      });
      const { latitude, longitude } = position.coords;
      return { latitude, longitude };
    } catch (error) {
      console.error("getLocation error:", error);
      return null;
    }
  } else {
    console.error("Geolocation is not supported in this browser");
    return null;
  }
};

export const findLocation = async () => {
  const location = await getLocation();
  const oneDayWeather = await apiLoader(`https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`);
  const fiveDayWeather = await apiLoader(`https://api.openweathermap.org/data/2.5/forecast?lat=${location?.latitude}&lon=${location?.longitude}&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`);
  return {oneDayWeather, fiveDayWeather}
}

//////////---------------------------------

// export const findLocation:(timeout?: number) => Promise<{oneDayWeather: OneDayWeatherType;fiveDayWeather: FiveDayWeatherType;} | null> = async (timeout = 5000) => {
//   if ("geolocation" in navigator) {
//     const positionPromise = new Promise<Position>((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(resolve, reject, { timeout });
//     });
//     try {
//       const position = await positionPromise;
//       const { latitude, longitude } = await position.coords;
//       const oneDayWeatherPromise = apiLoader(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`);
//       const fiveDayWeatherPromise = apiLoader(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=6ae6c79ccba3cdde251bf0965d4d137a`);
//       const [oneDayWeather, fiveDayWeather] = await Promise.all([oneDayWeatherPromise, fiveDayWeatherPromise]);
//       console.log({oneDayWeather, fiveDayWeather})
//       return { oneDayWeather, fiveDayWeather };
//     } catch (error) {
//       console.error("getLocation error:", error);
//       return null;
//     }
//   } else {
//     console.error("Geolocation is not supported in this browser");
//     return null;
//   }
// };
