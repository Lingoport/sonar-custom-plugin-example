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
import QualityGate from './QualityGate'
import Rating from './Rating'
import '../style.css';


export default class MeasuresHistory extends React.PureComponent {

  render() {
    var scan = this.props.measure.Scan.split(";")
    var ruleset = this.props.measure.RuleSet.split(";")
    var issues = this.props.measure.Issues.split(";")
    var lines = this.props.measure.Lines.split(";")
    var files = this.props.measure.Files.split(";")

    var content = new Array(scan.length);
    for(let d = 0; d < scan.length; d++){
     content[d]  = (
        <tr height="30" class="alt">
        <td className="label">{scan[d]}</td>
        <td className="label">{ruleset[d]}</td>
        <td className="label">{issues[d]}</td>
        <td className="label">{lines[d]}</td>
        <td className="label">{files[d]}</td>
        </tr>
    );
  }
    return (
      <table className="lg_ds_progress_bar" border="0" width="500">
      <thead>
      <tr>
       <th>Scan</th><th>Rule Set</th><th>Issues</th><th>Lines</th><th>Files</th>
      </tr>
      </thead>
      <tbody>
          {content}
      </tbody></table>

    );
  }
}
