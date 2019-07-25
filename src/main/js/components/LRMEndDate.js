/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';


export default class LRMEndDate extends React.PureComponent {

  render() {

    return (
      <table className="lg_ds_progress_bar" border="0" width="500">
      <tbody>
          <tr>Your LRM License is valid until {this.props.measure.endDate}</tr>
          <tr>Your InContextQA License is valid until {this.props.measure.lqaendDate}</tr>
      </tbody></table>

    );
  }
}
