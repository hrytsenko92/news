import React, { ChangeEvent } from "react";
import style from "./formWeather.module.scss";
import closeSVG from '../../../assets/close.svg';
import locationSVG from '../../../assets/location.svg';

type FormProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  cityName: string;
  clearInput: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  findByLocation: () => void;
};

export const FormWeather = ({
  handleSubmit,
  cityName,
  clearInput,
  handleChange,
  findByLocation,
}: FormProps) => {
  return (
    <section className={style.formSection}>
      <form className={style.formWrapper} onSubmit={handleSubmit}>
          {cityName.length > 0 ? <button className={style.clearInput} onClick={clearInput}>
            <img className={style.closeSVG} src={closeSVG} />
          </button> : null}
          <input
            className={style.formInput}
            required
            type="text"
            placeholder="Enter city name..."
            value={cityName}
            onChange={handleChange}
          />
        <input className={style.formSubmit} value='Search...' type="submit" />
        <button className={style.formLocationbtn} onClick={findByLocation}>
          <img className={style.locationSVG} src={locationSVG} />
        </button>
      </form>
    </section>
  );
};
