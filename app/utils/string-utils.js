import _ from 'lodash';

export function commafy(num) {
  const str = num.toString().split('.');
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 4) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}

export function formatPercent(raw) {
  const numDecimals = 2;
  const percent = Math.floor(raw * 100 * (10 ** numDecimals)) / (10 ** numDecimals);
  return `${percent}%`;
}

export function formatCurrency(raw) {
  const number = _.isNumber(raw) ? raw : parseInt(raw, 10);
  const isNegative = number < 0;
  const totalCents = Math.floor(Math.abs(raw) * 100);
  const dollars = Math.floor(totalCents / 100);
  const centsLeft = totalCents - 100 * dollars;
  const formattedDollars = commafy(dollars);
  const formattedCents = (() => {
    if (centsLeft === 0) return '00';
    if (centsLeft < 10) return `0${centsLeft}`;
    return centsLeft;
  })();
  return `${isNegative ? '-' : ''}$${formattedDollars}.${formattedCents}`;
}

export function numbersOnly(raw) {
  const str = _.isString(raw) ? raw : `${raw}`;
  return str.replace(/[^\d]/g, '');
}
