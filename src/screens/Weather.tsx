import React, { FC, useEffect } from 'react'

export const Weather: FC = () => {

useEffect(() => {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
  console.log(`lat: ${latitude} and lon: ${longitude}`) // delete
  });
}, []);

  return (
    <div>Weather</div>
  )
}
