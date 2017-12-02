const _ = require('./lib/lodash');

// utils
const commafy = (num) => {
  var str = num.toString().split('.');
  if (str[0].length >= 4) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 4) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}

const formatPercent = (raw) => {
  const numDecimals = 2;
  const percent = Math.floor(raw * 100 * Math.pow(10, numDecimals)) / Math.pow(10, numDecimals);
  return `${percent}%`;
}

const formatCurrency = (raw) => {
  const isNegative = raw < 0;
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

// brackets
const brackets = {
  current: {
    single: [
      {
        top: 9325,
        rate: 0.10,
      },
      {
        top: 37950,
        rate: 0.15,
      },
      {
        top: 91900,
        rate: 0.25,
      },
      {
        top: 191650,
        rate: 0.28,
      },
      {
        top: 416700,
        rate: 0.33,
      },
      {
        top: 418400,
        rate: 0.35,
      },
      {
        rate: 0.396,
      },
    ],
    married: [
      {
        top: 18650,
        rate: 0.10,
      },
      {
        top: 75900,
        rate: 0.15,
      },
      {
        top: 153100,
        rate: 0.25,
      },
      {
        top: 233350,
        rate: 0.28,
      },
      {
        top: 416700,
        rate: 0.33,
      },
      {
        top: 470700,
        rate: 0.35,
      },
      {
        rate: 0.396,
      },
    ],
  },
  house: {
    single: [
      {
        top: 45000,
        rate: 0.12,
      },
      {
        top: 200000,
        rate: 0.25,
      },
      {
        top: 500000,
        rate: 0.35,
      },
      {
        rate: 0.396,
      },
    ],
    married: [
      {
        top: 90000,
        rate: 0.12,
      },
      {
        top: 260000,
        rate: 0.25,
      },
      {
        top: 1000000,
        rate: 0.35,
      },
      {
        rate: 0.396,
      },
    ],
  },
  senate: {
    single: [
      {
        top: 9525,
        rate: 0.10,
      },
      {
        top: 38700,
        rate: 0.12,
      },
      {
        top: 70000,
        rate: 0.22,
      },
      {
        top: 160000,
        rate: 0.24,
      },
      {
        top: 200000,
        rate: 0.32,
      },
      {
        top: 500000,
        rate: 0.35,
      },
      {
        rate: 0.385,
      },
    ],
    married: [
      {
        top: 19050,
        rate: 0.10,
      },
      {
        top: 77400,
        rate: 0.12,
      },
      {
        top: 140000,
        rate: 0.22,
      },
      {
        top: 320000,
        rate: 0.24,
      },
      {
        top: 400000,
        rate: 0.32,
      },
      {
        top: 1000000,
        rate: 0.35,
      },
      {
        rate: 0.385,
      },
    ],
  },
};

const printSavings = (taxableIncome) => {
  console.log(`for taxable income ${formatCurrency(taxableIncome)}:`);
  console.log('');

  const taxes = (brackets) => {
    let taxSoFar = 0;
    let previousTopOfBracket = 0;

    _.each(brackets, (bracket) => {
      let topOfBracket = bracket.top ? bracket.top : 100000000000;

      let bracketSize = topOfBracket - previousTopOfBracket;
      let amountTaxed = Math.min(bracketSize, taxableIncome - previousTopOfBracket)
      taxSoFar += amountTaxed * bracket.rate;
      previousTopOfBracket = topOfBracket;

      if (amountTaxed != bracketSize) {
        return false;
      }
    });

    return {
      tax: taxSoFar,
      effective_rate: (taxSoFar / taxableIncome),
    };
  };

  const fullResults = {};
  _.each(brackets, (plan, planName) => {
    _.each(plan, (status, statusName) => {
      const name = `${planName} ${statusName}`; 
      fullResults[name] = taxes(status); 
      console.log(`    ${name}`);
      console.log(`        tax is ${formatCurrency(fullResults[name].tax)}`);
      console.log(`       rate is ${formatPercent(fullResults[name].effective_rate)}`);
    });
  });

  const compare = (originalName, newName) => {
    const originalResults = fullResults[originalName];
    const newResults = fullResults[newName];
    console.log(`        comparison for '${newName}' over '${originalName}'`);
    console.log(`              total savings: ${formatCurrency(originalResults.tax - newResults.tax)}`);
    console.log(`            percent savings: ${formatPercent(originalResults.effective_rate - newResults.effective_rate)}`);
  };

  console.log('');
  console.log('    savings from MARRIAGE')
  compare('current single', 'current married');
  compare('house single', 'house married');
  compare('senate single', 'senate married');
  console.log('');
  console.log('    savings from BILLS if SINGLE');
  compare('current single', 'house single');
  compare('current single', 'senate single');
  console.log('');
  console.log('    savings from BILLS if MARRIED');
  compare('current married', 'house married');
  compare('current married', 'senate married');
  console.log('');
  console.log('');
  console.log('');
  console.log('');
};

printSavings(10000);
printSavings(20000);
printSavings(30000);
printSavings(40000);
printSavings(50000);
printSavings(60000);
printSavings(70000);
printSavings(80000);
printSavings(90000);

printSavings(100000);
printSavings(120000);
printSavings(130000);
printSavings(140000);
printSavings(150000);
printSavings(160000);
printSavings(170000);
printSavings(180000);
printSavings(190000);

printSavings(200000);
printSavings(220000);
printSavings(230000);
printSavings(240000);
printSavings(250000);
printSavings(260000);
printSavings(270000);
printSavings(280000);
printSavings(290000);

printSavings(300000);
printSavings(320000);
printSavings(330000);
printSavings(340000);
printSavings(350000);
printSavings(360000);
printSavings(370000);
printSavings(380000);
printSavings(390000);

printSavings(400000);
printSavings(420000);
printSavings(430000);
printSavings(440000);
printSavings(450000);
printSavings(460000);
printSavings(470000);
printSavings(480000);
printSavings(490000);

printSavings(500000);
printSavings(520000);
printSavings(530000);
printSavings(540000);
printSavings(550000);
printSavings(560000);
printSavings(570000);
printSavings(580000);
printSavings(590000);

printSavings(600000);
printSavings(620000);
printSavings(630000);
printSavings(640000);
printSavings(650000);
printSavings(660000);
printSavings(670000);
printSavings(680000);
printSavings(690000);

printSavings(700000);
printSavings(720000);
printSavings(730000);
printSavings(740000);
printSavings(750000);
printSavings(760000);
printSavings(770000);
printSavings(780000);
printSavings(790000);

printSavings(800000);
printSavings(820000);
printSavings(830000);
printSavings(840000);
printSavings(850000);
printSavings(860000);
printSavings(870000);
printSavings(880000);
printSavings(890000);

printSavings(900000);
printSavings(920000);
printSavings(930000);
printSavings(940000);
printSavings(950000);
printSavings(960000);
printSavings(970000);
printSavings(980000);
printSavings(990000);

printSavings(1000000);
printSavings(1020000);
printSavings(1030000);
printSavings(1040000);
printSavings(1050000);
printSavings(1060000);
printSavings(1070000);
printSavings(1080000);
printSavings(1090000);
