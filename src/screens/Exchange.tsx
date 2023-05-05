import { FC, useEffect, useState } from "react";
import { ExchangeRateType } from "../types/ExchangeRateType";
import { apiLoader } from "../api/apiLoader";

export const Exchange: FC = () => {
  const [data, setData] = useState<ExchangeRateType>();
  const [selectedInCurrency, setSelectedInCurrency] = useState<number>(100); // input
  const [selectedOutCurrency, setSelectedOutCurrency] = useState<number | null>(null);

  const onCurrencyInChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = Number(event.target.value);
      const selectedCurrency: [string, number] = Object.entries(data.conversion_rates).find(([key, value]) => value === selectedValue)
      getNewData(selectedCurrency[0])
      // setSelectedInCurrency(Number(event.target.value));
  //     console.log(event.target.value)
  // console.log(selectedCurrency); 
  };
  const onCurrencyOutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOutCurrency(Number(event.target.value));
    console.log(event.target.value)
  };
  const getNewData = async (code: string) => {
    const res: ExchangeRateType = await apiLoader(`https://v6.exchangerate-api.com/v6/600640d62d3baeea55a4dccd/latest/${code}`);
    setData(res);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedInCurrency(Number(event.target.value));
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
console.log(data)
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
          <div className="exchangeValue">
            <input type="text" value={selectedInCurrency} onChange={handleInputChange} />
            {selectedOutCurrency !== null ?  <div>{`result is: ${selectedInCurrency * selectedOutCurrency} `}</div> : <div>select code</div>}
          </div>
          
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
