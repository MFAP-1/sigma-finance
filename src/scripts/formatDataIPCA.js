function formatDataIPCA(dateString) {
  let formatedDate = dateString.slice(0, 7).split("-").join("");
  return formatedDate;
}

export default formatDataIPCA;
