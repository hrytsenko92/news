import React from 'react'
import { FiveDayWeatherType } from '../../types/fiveDayWeatherType'

type FiveDaysWeatherProps = {
    fiveDayData: FiveDayWeatherType;
}

export const FiveDayWeather = ({fiveDayData}: FiveDaysWeatherProps )=> {
    console.log(fiveDayData);
  return (
    <div>FiveDayWeather</div>
  )
}
