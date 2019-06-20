/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 */
import React from 'react';
import MeasuresHistory from './MeasuresHistory'
import {translate} from '../common/l10n.js'
import {findVersionsAndMeasures} from '../api.js'
import {findgyzrEndDate} from '../api.js'
import GlobalyzerEndDate from './GlobalyzerEndDate'


export default class VersionsMeasuresHistoryApp extends React.PureComponent {

  state = {
    endDate: [],
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

    findgyzrEndDate(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          endDate: valuesReturnedByAPI
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

            {this.state.endDate.map(
                (value,idx) =>
                <GlobalyzerEndDate
                  measure={value}
                  key={idx}
                />
                )
            }

            <br/>
          </tr></thead>
          <h3>Globalyzer Scans</h3>
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
