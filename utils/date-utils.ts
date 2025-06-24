export const generateDateRange = (startDate: Date, days = 7) =>
  Array.from({ length: days }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });
export const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const formatDisplayDate = (date: Date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return {
    month: months[date.getMonth()],
    day: date.getDate(),
    weekday: days[date.getDay()],
  };
};
