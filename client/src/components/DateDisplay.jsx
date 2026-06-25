const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function DateDisplay({ startDateStr, endDateStr }) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const startMonth = months[startDate.getMonth()];
  const startYear = startDate.getFullYear();

  const endMonth = months[endDate.getMonth()];
  const endYear = endDate.getFullYear();

  return (
    <strong>{`${startMonth} ${startYear} to ${endMonth} ${endYear}`}</strong>
  );
}

export default DateDisplay;
