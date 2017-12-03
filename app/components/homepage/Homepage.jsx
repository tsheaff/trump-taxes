import React, { Component } from 'react';
import classNames from 'classnames';
import autobind from 'autobind-decorator';
import { Form, Text, Radio, RadioGroup, Select } from 'react-form';

import stateOptions from '../../models/brackets/state/states';
import { formatCurrency, formatPercent, numbersOnly } from '../../utils/string-utils';
import taxCalculator from '../../models/brackets/calculator';

@autobind
export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  taxResults() {
    const values = this.state.formValues || {};
    const isMarried = values.filingStatus === 'married';
    const rawIncome = values.income || '0';
    const income = parseInt(numbersOnly(rawIncome), 10);
    return taxCalculator(income, isMarried);
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

  get form() {
    return (
      <Form formDidUpdate={this.formDidUpdate}>
        { (formApi) => (
          <form onSubmit={formApi.submitForm} id="form2">
            <label htmlFor="income">How much will you make in 2018?</label>
            <Text field="income" id="income" />
            <label htmlFor="filingStatus">How will you file?</label>
            <RadioGroup field="filingStatus">
              { (group) => (
                <div>
                  <label htmlFor="single" className="single">Single</label>
                  <Radio group={group} value="single" id="single" className="group-value single" />
                  <label htmlFor="married" className="married">Married</label>
                  <Radio group={group} value="married" id="married" className="group-value married" />
                </div>
              )}
            </RadioGroup>
            <label htmlFor="status" className="d-block">Which state do you live in?</label>
            <Select field="status" id="status" options={stateOptions} />
          </form>
        )}
      </Form>
    );
  }

  formDidUpdate(formState = {}) {
    console.log('formDidUpdate', formState);
    this.setState({
      formValues: formState.values,
    });
  }

  render() {
    return (
      <div className="homepage">
        {this.form}
        {this.results}
      </div>
    );
  }
}
