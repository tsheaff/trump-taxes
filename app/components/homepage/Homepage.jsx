import React, { Component } from 'react';
import classNames from 'classnames';

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className={classNames('hello')}>
        <span>Trump Taxes</span>
      </div>
    );
  }
}
