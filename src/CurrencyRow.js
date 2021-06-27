import React from 'react'

export default function CurrencyRow({
    currency,
    changeCurrency,
    amount,
    onChangeAmount,
    isDisabledInput,
    isDisabledSelect,
}) {
    const checkedOption = currency.find(item => item.checked === true)

    const changeCurrencyHandler = e => {
        const newCheckedValue = e.target.value;

        const newCurrency = currency.map(item => {
            if (item.checked === true) {
                return { ...item, checked: false }
            }

            if (item.label === newCheckedValue) {
                return { ...item, checked: true }
            }

            return item
        })

        changeCurrency(newCurrency)
    }

    const onChangeHandler = e => {
        const newValue = e.target.value
        if (newValue >= 0) {
            onChangeAmount(newValue)
        }
    }
    
    return (
        <div>
            <input
                type="number"
                className="input"
                value={amount}
                onChange={onChangeHandler}
                disabled={isDisabledInput}
            />
            <select value={checkedOption.value} onChange={changeCurrencyHandler} disabled={isDisabledSelect}>
                {currency.map((option, keys) => (
                    <option key={keys} value={option.label}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}
