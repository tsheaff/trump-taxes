import React, { Component } from 'react';
import classNames from 'classnames';
import autobind from 'autobind-decorator';

import Question from './Question';
import { formatCurrency } from '../../utils/string-utils';

@autobind
export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marriageStatus: false,
      income: '',
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

  render() {
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
}
