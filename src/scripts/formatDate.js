function formatDate(dateString) {
  let newDate = new Date(dateString);
  let auxArr = newDate.toString().slice(4, 15).split(" ");
  auxArr[3] = auxArr[0];
  auxArr[0] = auxArr[1];
  auxArr[1] = auxArr[3];
  auxArr.pop();
  return auxArr.join("/");
}

export default formatDate;
