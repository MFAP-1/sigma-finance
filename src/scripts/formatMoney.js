function formatMoney(value, targetCurrency) {
  // fallback for the empty scenario
  if (targetCurrency === "") {
    targetCurrency = "USD";
  }
  let locale = "pt-BR"; // for EUR currency, the locale format is the same as "pt-BR"
  if (targetCurrency === "USD") {
    locale = "en-US";
  }
  return value.toLocaleString(locale, {
    style: "currency",
    currency: targetCurrency,
  });
}

export default formatMoney;
