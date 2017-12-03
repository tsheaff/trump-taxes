import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autobind from 'autobind-decorator';

@autobind
export default class Question extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.optional,
    onChange: PropTypes.func.isRequired,
  };

  onChange(event) {
    this.props.onChange(event.target.value);
  }

  get inputType() {
    if (this.props.type === 'currency') {
      return 'text';
    }
    return this.props.type;
  }

  render() {
    return (
      <form className={classNames(this.props.name)} onSubmit={this.onSubmit}>
        <label>
          {this.props.question}
          <input
            required
            name={this.props.name}
            type={this.inputType}
            placeholder={this.props.placeholder}
            value={this.props.answer}
            onChange={this.onChange}
            autoCorrect="off"
            autoCapitalize="none"
          />
        </label>
      </form>
    );
  }
}
