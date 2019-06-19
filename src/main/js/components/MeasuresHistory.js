/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import QualityGate from './QualityGate'
import Rating from './Rating'

export default class MeasuresHistory extends React.PureComponent {

  render() {
    return (
      <tr>


        <td className="thin nowrap text-right"><div className="code-components-cell"><span>{this.props.measure.Scan}</span></div></td>

        <td className="thin nowrap text-right"><div className="code-components-cell"><span>{this.props.measure.RuleSet}</span></div></td>

        <td className="thin nowrap text-right"><div className="code-components-cell"><span>{this.props.measure.Issues}</span></div></td>

        <td className="thin nowrap text-right"><div className="code-components-cell"><span>{this.props.measure.Lines}</span></div></td>

        <td className="thin nowrap text-right"><div className="code-components-cell"><span>{this.props.measure.Files}</span></div></td>


      </tr>
    );
  }
}
