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
import { Chart } from "react-google-charts";
import '../style.css';


export default class GlobalyzerIssuesHistory extends React.PureComponent {

  render() {
    var gdate = this.props.measure.gdate.split(";")
    var value = this.props.measure.value.split(";")

    return (
      <table className="lg_ds_progress_bar" border="0" width="500">
      <thead>
      <tr>
       <th>Scan</th><th>Rule Set</th><th>Issues</th><th>Lines</th><th>Files</th>
      </tr>
      </thead>
      <tbody>
          {this.props.measure.gdate}
      </tbody></table>

    );
  }
}
