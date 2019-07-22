/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com

 */
import React from 'react';
import { Chart } from "react-google-charts";
import {translate} from '../common/l10n.js'
import {findLRMViolations} from '../api_lrm.js'
import {findlrmEndDate} from '../api_lrm.js'
import {findPrepLocale} from '../api_lrm.js'
import {findTraLRMViolations} from '../api_lrm.js'
import {findLrmCompletion} from '../api_lrm.js'
import {findLrmProductivity} from '../api_lrm.js'
import {findLrmHistory} from '../api_lrm.js'

import LRMEndDate from './LRMEndDate'
import LRMPrepKitContent from './LRMPrepKitContent'
import LRMViolations from './LRMViolations'
import LRMTransViolations from './LRMTransViolations'
import LRMCompletion from './LRMCompletion'
import LRMProductivity from './LRMProductivity'
import LRMHistory from './LRMHistory'


export default class OverviewApp extends React.PureComponent {

  state = {
    endDate: [],
    preLocal: [],
    violation: [],
    violation_tr:[],
    chart: [],
    completion:[],
    productivity:[],
    history:[]
  };

  componentDidMount() {

    findlrmEndDate(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          endDate: valuesReturnedByAPI
        });
      }
    );

    findLrmHistory(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          history: valuesReturnedByAPI
        });
      }
    );

    findLRMViolations(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          violation: valuesReturnedByAPI
        });
      }
    );

    findLrmCompletion(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          completion: valuesReturnedByAPI
        });
      }
    );

    findLrmProductivity(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          productivity: valuesReturnedByAPI
        });
      }
    );

    findTraLRMViolations(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          violation_tr: valuesReturnedByAPI
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
          {this.state.violation.map(
              (value,idx) =>
              <LRMViolations
                measure={value}
                key={idx}
              />
              )
          }
          <br/>
          <br/>
          {this.state.violation_tr.map(
              (value,idx) =>
              <LRMTransViolations
                measure={value}
                key={idx}
              />
              )
          }
          <br/>
          <br/>

          {this.state.completion.map(
              (value,idx) =>
              <LRMCompletion
                measure={value}
                key={idx}
              />
              )
          }
          <br/>
          <br/>

          {this.state.productivity.map(
              (value,idx) =>
              <LRMProductivity
                measure={value}
                key={idx}
              />
              )
          }
          <br/>
          <br/>

          {this.state.history.map(
              (value,idx) =>
              <LRMHistory
                measure={value}
                key={idx}
              />
              )
          }
          <br/>
          <br/>
          </tbody>
        </table>

      </div>
    );
  }
}
