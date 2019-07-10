/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com

 */
import React from 'react';
import { Chart } from "react-google-charts";
import {translate} from '../common/l10n.js'
import {findScans} from '../api.js'
import {findlrmEndDate} from '../api_lrm.js'
import {findPrepLocale} from '../api_lrm.js'
import LRMEndDate from './LRMEndDate'
import LRMPrepKitContent from './LRMPrepKitContent'




export default class LRMApp extends React.PureComponent {

  state = {
    endDate: [],
    data: [],
    preLocal: [],
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


    findlrmEndDate(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          endDate: valuesReturnedByAPI
        });
      }
    );

    findPrepLocale(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          preLocal: valuesReturnedByAPI
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
                <LRMEndDate
                  measure={value}
                  key={idx}
                />
                )
            }
            <br/>
          </tr></thead>
          <h3>Next Prep Kit Content</h3>
          <tbody>

          {this.state.preLocal.map(
              (value,idx) =>
              <LRMPrepKitContent
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
              ['x', 'LRM Remaining Files'],
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
               title: 'LRM Remaining Files',
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
