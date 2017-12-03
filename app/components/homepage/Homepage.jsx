import React, { Component } from 'react';
import classNames from 'classnames';
import autobind from 'autobind-decorator';

import Question from './Question';
import { formatCurrency, formatPercent } from '../../utils/string-utils';
import taxCalculator from '../../models/brackets/calculator';

@autobind
export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marriageStatus: false,
      income: 50000,
    };
  }

  onChangeMarriageStatus(marriageStatus) {
    this.setState({
      marriageStatus: marriageStatus,
    });
  }

  onChangeIncome(income) {
    this.setState({
      income: income,
    });
  }

  taxResults() {
    const isMarried = !!this.state.marriageStatus;
    return taxCalculator(this.state.income, isMarried);
  }

  get questions() {
    return (
      <div className={classNames('questions')}>
        <Question
          name="marriage-status"
          question="Are you married?"
          answer={this.state.marriageStatus}
          type="checkbox"
          onChange={this.onChangeMarriageStatus}
        />
        <Question
          name="income"
          placeholder={formatCurrency(50000)}
          question="How much will you make in 2017?"
          answer={this.state.income}
          type="currency"
          onChange={this.onChangeIncome}
        />
      </div>
    );
  }

  result(type, title) {
    const results = this.taxResults();
    const result = results[type];
    const tax = formatCurrency(result.tax);
    const rate = formatPercent(result.effective_rate);
    return (
      <div className={classNames('result', type)}>
        {title}
        <div className="amount">{tax}</div>
        <div className="rate">{rate}</div>
      </div>
    );
  }

  get results() {
    return (
      <div className={classNames('results')}>
        {this.result('current', 'Current Law:')}
        {this.result('house', 'House Bill:')}
        {this.result('senate', 'Senate Bill:')}
      </div>
    );
  }

  render() {
    return (
      <div className="homepage">
        {this.questions}
        {this.results}
      </div>
    );
  }
}
