import { FC, useEffect, useState } from "react";
import { ExchangeRateType } from "../../types/ExchangeRateType";
import { apiLoader } from "../../loaders/apiLoader";
import { Select } from "../../components/exchange/Select";
import { Loading } from "../../components/loading/Loading";
import style from "./exchange.module.scss";

export const Exchange: FC = () => {
  const [data, setData] = useState<ExchangeRateType>();
  const [inputCurrency, setInputCurrency] = useState<number>(100);
  const [selectedOutCurrency, setSelectedOutCurrency] = useState<number | null>(
    null
  );

  const getNewData = async (code: string) => {
    const res: ExchangeRateType = await apiLoader(
      `https://v6.exchangerate-api.com/v6/600640d62d3baeea55a4dccd/latest/${code}`
    );
    setData(res);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCurrency(Number(event.target.value));
  };
  const onCurrencyInChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = Number(event.target.value);
    const selectedCurrency: [string, number] = Object.entries(
      data.conversion_rates
    ).find(([key, value]) => value === selectedValue);
    getNewData(selectedCurrency[0]);
  };
  const onCurrencyOutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOutCurrency(Number(event.target.value));
  };

  useEffect(() => {
    const getData = async () => {
      const res: ExchangeRateType = await apiLoader(
        `https://v6.exchangerate-api.com/v6/600640d62d3baeea55a4dccd/latest/UAH`
      );
      setData(res);
    };
    getData();
  }, []);
  return (
    <section className={style.container}>
      <h1 className={style.title}>Currency converter</h1>
      {data !== undefined ? (
        <div className={style.positionWrapper}>
          <div className={style.selectInWrapper}>
            <input
              className={style.input}
              type="text"
              value={inputCurrency}
              onChange={handleInputChange}
            />
            <div className={style.selectIn}>
              <Select data={data} onCurrencyChange={onCurrencyInChange} />
            </div>
          </div>
          <div className={style.selectOutWrapper}>
            {selectedOutCurrency !== null ? (
              <div className={style.result}>{`${(
                inputCurrency * selectedOutCurrency
              ).toFixed(2)}`}</div>
            ) : <span className={style.defaultText}>Select currency</span>}
            <div className={style.selectOut}>
              <Select data={data} onCurrencyChange={onCurrencyOutChange} />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      {data !== undefined ? (
        <div
          className={style.info}
        >{`*Last data updated at ${data.time_last_update_utc}`}</div>
      ) : null}
    </section>
  );
};
