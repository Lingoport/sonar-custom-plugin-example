/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 <div className="lpgzsummaryscanwidget" style="height:100%;">

   <div className="widget">
     <h3>Globalyzer Scans</h3>
    <div className="lg_widget">
 */
import React from 'react';
import '../style.css';


export default class LRMEndDate extends React.PureComponent {

  render() {

    return (
      <table className="lg_ds_progress_bar" border="0" width="500">
      <tbody>
          <td>Your Globalyzer License is valid until {this.props.measure.endDate}</td>
      </tbody></table>

    );
  }
}
