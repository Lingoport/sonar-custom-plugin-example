/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import {translate} from '../common/l10n.js'
import {findgyzrSummary} from '../api.js'
import {findlplrmsummary} from '../api_lrm.js'
import {findgzLrmHistory} from '../api_lrm.js'
import {findlpLicense} from '../api.js'

import OverviewGlobalyzerSummary from './OverviewGlobalyzerSummary'
import OverviewLRMSummary from './OverviewLRMSummary'
import OverviewHistory from './OverviewHistory'
import OverviewLicense from './OverviewLicense'


export default class OverviewApp extends React.PureComponent {

  state = {
    gzsummary: [],
    lrmsummary: [],
    history:[],
    license:[]
  };

  componentDidMount() {

    findgyzrSummary(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          gzsummary: valuesReturnedByAPI
        });
      }
    );

    findlplrmsummary(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
        lrmsummary: valuesReturnedByAPI
        });
      }
    );

    findlpLicense(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          history: valuesReturnedByAPI
        });
      }
    );

    findgzLrmHistory(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          license: valuesReturnedByAPI
        });
      }
    );
  }




  render() {
    // Data Gathered: {JSON.stringify(this.state.data)}
    return (
      <div id="body" className="page-container">
      <div id="content">
      <div className="page" id="dashboard">
        <span className="hidden" id="is-project-dashboard"></span>
        <header className="page-header">
          <h1 className="page-title">Lingoport Overview</h1>
          </header>
          <div style={{width: '100%',display: 'block', float: 'none'}}>

              <div className="dashboard-column-wrapper" style={{width: '50%',margin: '0 -1px 0 0',float:'left'}}>
                <div className="dashboard-column" id="dashboard-column-1" style={{margin: '0 5px 0 0px',padding:'0',overflow:'visible'}}>

                {this.state.lrmsummary.map(
                    (value,idx) =>
                    <OverviewLRMSummary
                      measure={value}
                      key={idx}
                    />
                    )
                }
                {this.state.gzsummary.map(
                    (value,idx) =>
                    <OverviewGlobalyzerSummary
                      measure={value}
                      key={idx}
                    />
                    )
                }

                </div>
               </div>


               <div className="dashboard-column-wrapper" style={{width: '50%',margin: '0 -1px 0 0',float:'left'}}>
                 <div className="dashboard-column" id="dashboard-column-2" style={{margin: '0 0px 0 5px',float:'rignt',padding:'0',overflow:'visible'}}>

                 {this.state.license.map(
                     (value,idx) =>
                     <OverviewLicense
                       measure={value}
                       key={idx}
                     />
                     )
                 }

                 {this.state.history.map(
                     (value,idx) =>
                     <OverviewHistory
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
