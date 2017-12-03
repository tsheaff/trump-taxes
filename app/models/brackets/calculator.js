import _ from 'lodash';

import bracketCurrentMarried from './federal/current/married';
import bracketCurrentSingle from './federal/current/single';
import bracketHouseMarried from './federal/house/married';
import bracketHouseSingle from './federal/house/single';
import bracketSenateMarried from './federal/senate/married';
import bracketSenateSingle from './federal/senate/single';

const taxes = (income, brackets) => {
  let taxSoFar = 0;
  let previousTopOfBracket = 0;
  _.each(brackets, (bracket) => {
    const topOfBracket = bracket.top ? bracket.top : 1000000000000000;

    const bracketSize = topOfBracket - previousTopOfBracket;
    const amountTaxed = Math.min(bracketSize, income - previousTopOfBracket);
    taxSoFar += amountTaxed * bracket.rate;
    previousTopOfBracket = topOfBracket;

    if (amountTaxed !== bracketSize) {
      return false;
    }
  });

  return {
    tax: taxSoFar,
    effective_rate: (taxSoFar / income),
  };
};

export default (income, isMarried) => {
  return {
    current: taxes(income, isMarried ? bracketCurrentMarried : bracketCurrentSingle),
    house: taxes(income, isMarried ? bracketHouseMarried : bracketHouseSingle),
    senate: taxes(income, isMarried ? bracketSenateMarried : bracketSenateSingle),
  };
};
