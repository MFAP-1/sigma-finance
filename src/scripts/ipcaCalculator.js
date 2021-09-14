import axios from "axios";
import formatDataIPCA from "./formatDataIPCA";

const ipcaCalculator = async (fromDate, toDate, amount) => {
  try {
    // let initialDate = fromDate.slice(0, 7).split("-").join("")      
    // let endDate = toDate.slice(0, 7).split("-").join("") 
    let initialDate = formatDataIPCA(fromDate);
    let endDate = formatDataIPCA(toDate);

    console.log("teste")
    let url = `https://servicodados.ibge.gov.br/api/v3/agregados/1737/periodos/${initialDate}-${endDate}/variaveis/63?localidades=N1[all]`;
    

    const response = await axios.get(url);
    let dataIPCA = response.data[0]["resultados"][0]["series"][0]["serie"];
    console.log(response.data[0]["resultados"][0]["series"][0]["serie"])
    let valuesIPCA = Object.values(dataIPCA)
    let valuesIPCAasNumber = []
    let product = 1;
    
    
    for (let i = 0; i < valuesIPCA.length; i++) {
        valuesIPCAasNumber.push(parseFloat(valuesIPCA[i])/100);
    }
        console.log(valuesIPCAasNumber)

   
    for (let i = 0; i < valuesIPCAasNumber.length; i++) {
      product = product * (1 + valuesIPCAasNumber[i]);
      
    }

   
    console.log(product*amount);
   

    return product*amount;
  } catch (err) {
    console.error(err);
    alert("The specified date range is not valid. Please select a valid one")
  }
};

export default ipcaCalculator;
