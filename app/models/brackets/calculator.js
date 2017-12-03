import _ from 'lodash';

export default (taxableIncome, brackets) => {
  let taxSoFar = 0;
  let previousTopOfBracket = 0;
  _.each(brackets, (bracket) => {
    const topOfBracket = bracket.top ? bracket.top : 100000000000;

    const bracketSize = topOfBracket - previousTopOfBracket;
    const amountTaxed = Math.min(bracketSize, taxableIncome - previousTopOfBracket);
    taxSoFar += amountTaxed * bracket.rate;
    previousTopOfBracket = topOfBracket;

    if (amountTaxed !== bracketSize) {
      return false;
    }
  });

  return {
    tax: taxSoFar,
    effective_rate: (taxSoFar / taxableIncome),
  };
};
