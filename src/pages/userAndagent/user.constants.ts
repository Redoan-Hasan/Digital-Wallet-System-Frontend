export const addMoneySource ={
  BANK : "BANK",
  CARD : "CARD",
  MOBILE_BANKING : "MOBILE_BANKING",
  OTHER : "OTHER",
} as const;

export const TransactionType  ={
  ADD : 'ADD',
  WITHDRAW : 'WITHDRAW',
  CASH_IN :'CASH_IN',
  CASH_OUT : 'CASH_OUT',
  SEND_MONEY : 'SEND_MONEY',
  ADD_MONEY_BY_AGENT : 'ADD_MONEY_BY_AGENT',
  WITHDRAW_MONEY_BY_AGENT : 'WITHDRAW_MONEY_BY_AGENT'
} as const;

export const withdrawMoneySource = {
  BANK : "BANK",
  CARD : "CARD",
  MOBILE_BANKING : "MOBILE_BANKING",
  OTHER : "OTHER",
} as const;