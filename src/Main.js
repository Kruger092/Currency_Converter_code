import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.css';
import CurrencyRow from './CurrencyRow'

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=5f3ecaaee9876611868c238684070534&symbols=EUR,USD,UAH,RUB,JPY,CAD'

/**Бесплатная версия API работает только с EUR. Иначе можно было бы менять валюту в зависимости от языка браузера правильно.
Легко также добавлять дополнительную валюту прописав в URL нужную.**/

const getCurrencyByLanguage = () => {
  let currency = ''

  switch (window.navigator.language) {
    case "ru":
      currency = 'EUR'
      break;
    case "ua":
      currency = 'EUR'
      break;
    case "en":
      currency = 'EUR'
      break;
    default:
      currency = 'EUR'
  }

  return currency
}

function Main() {
  const dispatch = useDispatch()
  const stateFromstore = useSelector(state => state)
  const { fromCurrency, fromAmount, toCurrency, toAmount, exchangeRate } = stateFromstore

  const changeFromCurrencyHandler = newFromCurrency => {
    dispatch({
      type: "CHANGE_FROM_CURRENCY",
      newFromCurrency: newFromCurrency,
    })
  }

  const changeToCurrencyHandler = newToCurrency => {
    dispatch({
      type: "CHANGE_TO_CURRENCY",
      newToCurrency: newToCurrency,
    })
  }

  const changeFromAmountHandler = fromAmount => {
    dispatch({
      type: "CHANGE_FROM_AMOUNT",
      fromAmount: fromAmount,
    })
  } 

  const changeToAmountHandler = toAmount => {
    dispatch({
      type: "CHANGE_TO_AMOUNT",
      toAmount: toAmount,
    })
  } 

  const changeRateHandler = exchangeRate => {
    dispatch({
      type: "CHANGE_RATE",
      exchangeRate: exchangeRate,
    })
  } 

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {

        const currency = [...Object.keys(data.rates)]

        const currentFromCurrency = getCurrencyByLanguage();

        const newFromCurrency = [
          { label: currentFromCurrency, checked: true }
        ]
        changeFromCurrencyHandler(newFromCurrency)

        const newToCurrency = currency
          .filter(item => item !== currentFromCurrency)
          .map((item, index) => {
            return {
              label: item,
              checked: index === 0 ? true : false,
            }
          })
        changeToCurrencyHandler(newToCurrency)
      })
  }, [])

  useEffect(() => {
    if (fromCurrency.length && toCurrency.length) {
      const checkedFromCurrency = fromCurrency.find(item => item.checked === true)
      const checkedToCurrency = toCurrency.find(item => item.checked === true)

      fetch(`${BASE_URL}&base=${checkedFromCurrency.label}&symbols=${checkedToCurrency.label}`)
        .then(res => res.json())
        .then(data => changeRateHandler(data.rates[checkedToCurrency.label]))
    }
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    if (fromAmount && exchangeRate) {
      const newToAmount = fromAmount * exchangeRate
      changeToAmountHandler(newToAmount)
    }
  }, [fromAmount, exchangeRate])

  return (
    <>
      <h1>Currency Converter</h1>
      {(fromCurrency.length && toCurrency.length) && (
        <>
          <CurrencyRow
            currency={fromCurrency}
            changeCurrency={changeFromCurrencyHandler}
            amount={fromAmount}
            onChangeAmount={changeFromAmountHandler}
            isDisabledInput={false}
            isDisabledSelect={true}
          />
          <div className="equals">=</div>
          <CurrencyRow
            currency={toCurrency}
            changeCurrency={changeToCurrencyHandler}
            amount={toAmount}
            onChangeAmount={changeToAmountHandler}
            isDisabledInput={true}
            isDisabledSelect={false}
          />
        </>
      )}
    </>
  );
}

export default Main;
