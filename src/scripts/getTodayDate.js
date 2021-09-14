function getTodayDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd; // returning in the 'yyyy-mm-dd' format to match with HTML pattern
  return today;
}

export default getTodayDate;
