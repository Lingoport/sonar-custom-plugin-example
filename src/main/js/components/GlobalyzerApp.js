/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com

 */
import React from 'react';
import {translate} from '../common/l10n.js'
import {findVersionsAndMeasures} from '../api.js'
import {findgyzrEndDate} from '../api.js'
import {findgyzrViolations} from '../api.js'
import GlobalyzerEndDate from './GlobalyzerEndDate'
import GlobalyzerScanSummary from './GlobalyzerScanSummary'
import GlobalyzerViolations from './GlobalyzerViolations'
import GlobalyzerRulesSummary from './GlobalyzerRulesSummary'




export default class GlobalyzerApp extends React.PureComponent {

  state = {
    endDate: [],
    data: [],
    violation: []
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

    findgyzrViolations(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          violation: valuesReturnedByAPI
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
              <GlobalyzerScanSummary
                measure={value}
                key={idx}
              />
              )
          }
          <br/>
          <br/>
          {this.state.violation.map(
                (value,idx) =>
                <GlobalyzerViolations
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
