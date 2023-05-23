import React from 'react'
import { ExchangeRateType } from '../../types/ExchangeRateType';
import style from './select.module.scss';

interface SelectProps {
  data: ExchangeRateType;
  onCurrencyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({ data, onCurrencyChange }) => {
  return (
     <select className={style.selectWrapper} onChange={onCurrencyChange}>
            {Object.entries(data.conversion_rates).map(([currency, value]) => (
              <option key={currency} value={value}>
                {currency}
              </option>
            ))}
          </select>
  )
}
