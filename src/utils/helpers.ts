import { AnyFunction } from 'utils/types';

export const toUpperFirstLetter = (str: string = ''): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatDate = (date: Date | string): string => {
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

export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const debounce = (f: AnyFunction, timeout: number) => {
  let timeoutId: number | undefined;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      f(...args);
    }, timeout);
  };
};
