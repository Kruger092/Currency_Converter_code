export const rootReducer = function (previosStore, action) {
   switch (action.type) {
      case "CHANGE_FROM_CURRENCY":
         return {
            ...previosStore,
            fromCurrency: action.newFromCurrency
         }
      case "CHANGE_TO_CURRENCY":
         return {
            ...previosStore,
            toCurrency: action.newToCurrency
         }
      case "CHANGE_FROM_AMOUNT":
         return {
            ...previosStore,
            fromAmount: action.fromAmount
         }
      case "CHANGE_TO_AMOUNT":
         return {
            ...previosStore,
            toAmount: action.toAmount
         }
      case "CHANGE_RATE":
         return {
            ...previosStore,
            exchangeRate: action.exchangeRate
         }
      default:
         return previosStore;
   }
};
