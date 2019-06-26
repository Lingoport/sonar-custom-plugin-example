/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import '../style.css';


export default class GlobalyzerRulesSummary extends React.PureComponent {

  render() {
    return (
      <table className="lg_ds_progress_bar" border="0" width="500">
      <tbody>
        <tr>
          <td>Concatenations</td>
          <td>{this.props.measure.concatenations}</td>
        </tr>

        <tr>
          <td>Embedded Strings</td>
          <td>{this.props.measure.embedded}</td>
        </tr>

        <tr>
          <td>Locale-Sensitive Methods</td>
          <td>{this.props.measure.sensitive}</td>
        </tr>

        <tr>
          <td>General Patterns</td>
          <td>{this.props.measure.general}</td>
        </tr>

        <tr>
          <td>Static File References</td>
          <td>{this.props.measure.static}</td>
        </tr>


      </tbody></table>
    );
  }
}
//
