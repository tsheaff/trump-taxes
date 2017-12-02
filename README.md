# trump-tax-implications

A simple javascript that will show you how the new House and Senate tax bills will impact you (whether single or married)

# How to Use

Clone the repo. At the bottom of the `taxes.js` script you can replace `printSavings(50000);` with your own taxable income (in dollars).

Then when you run the script, it will print out something like this:

```
for taxable income $50,000.00:

    current single
        tax is $8,238.75
       rate is 16.47%
    current married
        tax is $6,567.50
       rate is 13.13%
    house single
        tax is $6,650.00
       rate is 13.3%
    house married
        tax is $6,000.00
       rate is 12%
    senate single
        tax is $6,939.50
       rate is 13.87%
    senate married
        tax is $5,619.00
       rate is 11.23%

    savings from MARRIAGE
        comparison for 'current married' over 'current single'
              total savings: $1,671.25
            percent savings: 3.34%
        comparison for 'house married' over 'house single'
              total savings: $650.00
            percent savings: 1.3%
        comparison for 'senate married' over 'senate single'
              total savings: $1,320.50
            percent savings: 2.64%

    savings from BILLS if SINGLE
        comparison for 'house single' over 'current single'
              total savings: $1,588.75
            percent savings: 3.17%
        comparison for 'senate single' over 'current single'
              total savings: $1,299.25
            percent savings: 2.59%

    savings from BILLS if MARRIED
        comparison for 'house married' over 'current married'
              total savings: $567.50
            percent savings: 1.13%
        comparison for 'senate married' over 'current married'
              total savings: $948.50
            percent savings: 1.89%
```

# Findings

Here are some findings based on the results at various income scales:

* Both the House and Senate plan provide small positive savings for all incomes, but never more than about 4%
* Savings are maximized for married couples making $320,000 under the Senate plan (4.6% savings)
* Both the House and Senate plans incentivize marriage *less than current law* for the lower incomes (under $100,000), and *more than current law* for higher incomes

I would love to see more contributions from the community, for example charts of savings over the income scale.
