export const formatCurrency = (number: number) => {
  const CURRENCY_FORMATTER = new Intl.NumberFormat("en-us", {
    currency: "USD",
    style: "currency",
  });
  return CURRENCY_FORMATTER.format(number);
};
