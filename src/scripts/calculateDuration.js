function calculateDuration(dateString) {
  const date = new Date(dateString);
  const today = new Date();

  const differenceInTime = today.getTime() - date.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return differenceInDays.toFixed(0);
}

export default calculateDuration;
