import qs from 'qs';

const getParsedQs = (queryString: string) => qs.parse(queryString && queryString.slice(1));
const setQueryStringWithoutReloading = (qsValue: string) => {
  const newURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}${qsValue}`;
  window.history.pushState({ path: newURL }, '', newURL);
};

export const getQueryStringValues = (queryString = window.location.search): any =>
  getParsedQs(queryString);

export function setQueryStringValues<F = {}>(filters: F, queryString = window.location.search) {
  const values = qs.parse(queryString && queryString.slice(1));
  const newQsValue = qs.stringify({
    ...values,
    ...filters,
  });
  setQueryStringWithoutReloading(`?${newQsValue}`);
}
