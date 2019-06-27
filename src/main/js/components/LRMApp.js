/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com

 */
import React from 'react';
import { Chart } from "react-google-charts";
import {translate} from '../common/l10n.js'
import {findScans} from '../api.js'
import {findgyzrEndDate} from '../api.js'
import {findgyzrViolations} from '../api.js'
import GlobalyzerEndDate from './GlobalyzerEndDate'
import GlobalyzerScanSummary from './GlobalyzerScanSummary'
import GlobalyzerViolations from './GlobalyzerViolations'
import GlobalyzerRulesSummary from './GlobalyzerRulesSummary'



export default class LRMApp extends React.PureComponent {

  state = {
    endDate: [],
    data: [],
    violation: [],
    chart: []
  };




  componentDidMount() {
    findScans(this.props.project).then(
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
          <br/>
          <br/>
          <div>
          <Chart
            width={'430px'}
            height={'250px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['x', 'Globalyzer Issues'],
              [new Date(2000, 8, 5), 0],
              [new Date(2000, 9, 5), 10],
              [new Date(2000, 12, 5), 23],
              [new Date(2001, 6, 5), 17],
              [new Date(2001, 6, 9), 27],
              [new Date(2001, 6, 20), 87],
              [new Date(2001, 7, 5), 67],
              [new Date(2001, 7, 30), 47],
              [new Date(2001, 8, 2), 37],

            ]}
            options={{
              chart: {
               title: 'Globalyzer Issues',
              },
            }}
          />
          </div>

          </tbody>
        </table>

      </div>
    );
  }
}
