import axios from "axios";

const ipcaCalculator = async (fromDate, toDate, amount) => {
  try {
    let initialDate =
      "01/" + fromDate.slice(0, 7).split("-").reverse().join("/");
    let endlDate = "01/" + toDate.slice(0, 7).split("-").reverse().join("/");

    let url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.4175/dados?formato=json&dataInicial=${initialDate}&dataFinal=${endlDate}`;
    console.log(url);

    const response = await axios.get(url);
    console.log(response.data.length);
    let valuesArray = [];
    let sum = 0;
    // let product = 1;

    for (let i = 0; i < response.data.length; i++) {
      valuesArray.push(parseFloat(response.data[i]["valor"]/100));
    }
    console.log(valuesArray);

    for (let i = 0; i < valuesArray.length; i++) {
    //   product = product * (1 + valuesArray[i]);
      sum += valuesArray[i];
    }

    // console.log(product * amount);
    console.log(amount + sum*amount);

    return amount;
  } catch (err) {
    console.error(err);
  }
};

export default ipcaCalculator;
