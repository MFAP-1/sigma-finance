import axios from "axios";


const SelicCalculator = async (fromDate, toDate, amount) => {
  try {
    let initialDate = fromDate.split("-").reverse().join("/")
    let endDate = toDate.split("-").reverse().join("/")
    
    let product = 1  

    let url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json&dataInicial=${initialDate}&dataFinal=${endDate}`;
    console.log(url);

    const response = await axios.get(url);
      
    for(let i = 0; i< response.data.length; i++){
        product = product*(1+parseFloat(response.data[i]["valor"])/100 )
     
    }
  


     console.log(product*amount);
     
  
    return product*amount;
   
  } catch (err) {
    console.error(err);
  }
};

export default SelicCalculator;
