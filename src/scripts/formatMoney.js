function formatMoney(value) {
  // let locale = "pt-BR";
  let locale = "en-US";
  // if (this.state.currency === "USD") {
  //   locale = "en-US";
  // }
  return value.toLocaleString(locale, {
    style: "currency",
    currency: "USD",
    // currency: this.state.currency,
  });
}

export default formatMoney;
