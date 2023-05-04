import { FC, useEffect, useState } from "react";
import { ExchangeRateType } from "../types/ExchangeRateType";
import { apiLoader } from "../api/apiLoader";

export const Exchange: FC = () => {
  const [data, setData] = useState<ExchangeRateType>();
  const [selectedInCurrency, setSelectedInCurrency] = useState("UAH");
  const [selectedOutCurrency, setSelectedOutCurrency] = useState("USD");

  const onCurrencyInChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInCurrency(event.target.value);
    console.log(event.target)
    // getNewData()
  };
  const onCurrencyOutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOutCurrency(event.target.accessKey);
  };
  const getNewData = async (code: string) => {
    const res: ExchangeRateType = await apiLoader(`https://v6.exchangerate-api.com/v6/600640d62d3baeea55a4dccd/latest/${code}`);
    setData(res);
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
// console.log(selectedInCurrency)
// console.log(selectedOutCurrency)
  return (
    <div className="container">
      {data !== undefined ? (
        <div className="selectWrapper">
          <select onChange={onCurrencyInChange}>
            {Object.entries(data.conversion_rates).map(([currency, value]) => (
              <option key={currency} value={value}>
                {currency}
              </option>
            ))}
          </select>

          <select onChange={onCurrencyOutChange}>
            {Object.entries(data.conversion_rates).map(([currency, value]) => (
              <option key={currency} value={value}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>Loading...</p> // loading component!
      )}
    </div>
  );
};
