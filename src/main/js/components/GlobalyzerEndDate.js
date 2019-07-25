/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';


export default class GlobalyzerEndDate extends React.PureComponent {

  render() {

    return (
      <table className="lg_ds_progress_bar" border="0" width="500">
      <tbody>
          <td>Your Globalyzer License is valid until {this.props.measure.endDate}</td>
      </tbody></table>

    );
  }
}
