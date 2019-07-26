/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
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
import {findlrmDueDate} from '../api_lrm.js'
import LRMEndDate from './LRMEndDate'
import LRMPrepKitContent from './LRMPrepKitContent'
import LRMViolations from './LRMViolations'
import LRMTransViolations from './LRMTransViolations'
import LRMCompletion from './LRMCompletion'
import LRMProductivity from './LRMProductivity'
import LRMHistory from './LRMHistory'
import LrmPrepKitDue from './LrmPrepKitDue'

export default class LRMApp extends React.PureComponent {

  state = {
    endDate: [],
    preLocal: [],
    violation: [],
    violation_tr:[],
    chart: [],
    completion:[],
    productivity:[],
    history:[],
    dueDate:[]
  };

  componentDidMount() {

    findlrmEndDate(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          endDate: valuesReturnedByAPI
        });
      }
    );

    findlrmDueDate(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          dueDate: valuesReturnedByAPI
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
    return (
      <div id="body" className="page-container">
      <div id="content">
      <div className="page" id="dashboard">
        <span className="hidden" id="is-project-dashboard"></span>
        <header className="page-header">
          <h1 className="page-title">Resource Manager</h1>
          {this.state.endDate.map(
              (value,idx) =>
              <LRMEndDate
                measure={value}
                key={idx}
              />
              )
          }
          </header>
          <div style={{width: '100%',display: 'block', float: 'none'}}>

              <div className="dashboard-column-wrapper" style={{width: '50%',margin: '0 -1px 0 0',float:'left'}}>
                <div className="dashboard-column" id="dashboard-column-1" style={{margin: '0 5px 0 0px',padding:'0',overflow:'visible'}}>

                {this.state.preLocal.map(
                    (value,idx) =>
                    <LRMPrepKitContent
                      measure={value}
                      key={idx}
                    />
                    )
                }
                {this.state.dueDate.map(
                    (value,idx) =>
                    <LrmPrepKitDue
                      measure={value}
                      key={idx}
                    />
                    )
                }

                {this.state.productivity.map(
                    (value,idx) =>
                    <LRMProductivity
                      measure={value}
                      key={idx}
                    />
                    )
                }

                </div>
               </div>


               <div className="dashboard-column-wrapper" style={{width: '50%',margin: '0 -1px 0 0',float:'left'}}>
                 <div className="dashboard-column" id="dashboard-column-2" style={{margin: '0 0px 0 5px',float:'rignt',padding:'0',overflow:'visible'}}>

                 <div className="block" id="block_7">
                 <div className="widget">
                 <link href="../style.css" rel="stylesheet"/>
                 <div className="lg_widget">
                 <table width="100%" align="center">
                 <tr>
                 <td width="50%" style={{float: 'left',margin: '0px',padding: '0px'}}>
                 {this.state.violation.map(
                     (value,idx) =>
                     <LRMViolations
                       measure={value}
                       key={idx}
                     />
                     )
                 }
                 </td>
                 <td width="50%" style={{float: 'right',margin: '0px',padding: '0px'}}>
                 {this.state.violation_tr.map(
                     (value,idx) =>
                     <LRMTransViolations
                       measure={value}
                       key={idx}
                     />
                     )
                 }
                 </td>
                 </tr>
                 </table></div></div></div>

                 {this.state.completion.map(
                     (value,idx) =>
                     <LRMCompletion
                       measure={value}
                       key={idx}
                     />
                     )
                 }

                 {this.state.history.map(
                     (value,idx) =>
                     <LRMHistory
                       measure={value}
                       key={idx}
                     />
                     )
                 }
                 </div>
                </div>
             </div>
            </div>
          </div>
      </div>

    );
  }
}
