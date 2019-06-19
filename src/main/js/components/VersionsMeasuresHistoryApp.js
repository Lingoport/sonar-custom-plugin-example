/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import MeasuresHistory from './MeasuresHistory'
import {translate} from '../common/l10n.js'
import {findVersionsAndMeasures} from '../api.js'

export default class VersionsMeasuresHistoryApp extends React.PureComponent {

  state = {
    data: []
  };

  componentDidMount() {
    findVersionsAndMeasures(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          data: valuesReturnedByAPI
        });
      }
    );
  }

  render() {
    // Data Gathered: {JSON.stringify(this.state.data)}
    return (
      <div className="page page-limited">
        <table className="data zebra">
          <thead><tr className="code-components-header">
            <th className="thin nowrap text-left code-components-cell">Scan</th>

            <th className="thin nowrap text-center code-components-cell">Rule Set</th>

            <th className="thin nowrap text-right code-components-cell">Issues</th>
            <th className="thin nowrap text-right code-components-cell">Lines</th>

            <th className="thin nowrap text-right code-components-cell">Files</th>

          </tr></thead>
          <tbody>
          {this.state.data.map(
              (value,idx) =>
              <MeasuresHistory
                measure={value}
                key={idx}
              />
              )
          }
          </tbody>
        </table>
      </div>
    );
  }
}
