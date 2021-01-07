export const toUpperFirstLetter = (str: string = ''): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatDate = (date: Date | string) => {
  const dateTimeFormat = new window.Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(
    new Date(date),
  );
  return `${day} ${month} ${year}`;
};
