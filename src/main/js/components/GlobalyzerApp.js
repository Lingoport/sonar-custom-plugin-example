/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import {translate} from '../common/l10n.js'
import {findScans} from '../api.js'
import {findgyzrEndDate} from '../api.js'
import {findgyzrSummary} from '../api.js'
import {findgyzrViolations} from '../api.js'
import {findgyzrHistory} from '../api.js'
import GlobalyzerEndDate from './GlobalyzerEndDate'
import GlobalyzerScanSummary from './GlobalyzerScanSummary'
import GlobalyzerViolations from './GlobalyzerViolations'
import GlobalyzerRulesSummary from './GlobalyzerRulesSummary'
import GlobalyzerIssuesHistory from './GlobalyzerIssuesHistory'
import OverviewGlobalyzerSummary from './OverviewGlobalyzerSummary'
import GlobalyzerPDFtype from './GlobalyzerPDFtype'
import GlobalyzerPDFpriority from './GlobalyzerPDFpriority'
import globalyzer_wide from '../img/Globalyzer_Wide.png'

export default class GlobalyzerApp extends React.PureComponent {

  state = {
    endDate: [],
    data: [],
    violation: [],
    summary: [],
    history: []
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

    findgyzrHistory(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          history: valuesReturnedByAPI
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

    findgyzrSummary(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          summary: valuesReturnedByAPI
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

          <div style={{width: '100%',display: 'block', float: 'none'}}>

              <div className="dashboard-column-wrapper" style={{width: '50%',margin: '0 -1px 0 0',float:'left'}}>
                <div className="dashboard-column" id="dashboard-column-1" style={{margin: '0 5px 0 0px',padding:'0',overflow:'visible'}}>
                <img style={{width:'225px',height:'55px',textAlign: 'right'}} src={globalyzer_wide} alt=""/>
                <br />
                {this.state.summary.map(
                    (value,idx) =>
                    <OverviewGlobalyzerSummary
                      measure={value}
                      key={idx}
                    />
                    )
                }

                {this.state.violation.map(
                      (value,idx) =>
                      <GlobalyzerViolations
                        measure={value}
                        key={idx}
                        />
                        )
                }

                </div>
               </div>


               <div className="dashboard-column-wrapper" style={{width: '50%',margin: '0 -1px 0 0',float:'left'}}>
                 <div className="dashboard-column" id="dashboard-column-2" style={{margin: '0 0px 0 5px',float:'rignt',padding:'0',overflow:'visible'}}>
                 {this.state.endDate.map(
                     (value,idx) =>
                     <GlobalyzerEndDate
                       measure={value}
                       key={idx}
                     />
                     )
                 }
                 <br />
                 <br />
                 {this.state.data.map(
                     (value,idx) =>
                     <GlobalyzerScanSummary
                       measure={value}
                       key={idx}
                     />
                     )
                 }
                 {this.state.data.map(
                     (value,idx) =>
                     <GlobalyzerPDFtype
                       measure={value}
                       key={idx}
                     />
                     )
                 }
                 {this.state.data.map(
                     (value,idx) =>
                     <GlobalyzerPDFpriority
                       measure={value}
                       key={idx}
                     />
                     )
                 }
                 {this.state.history.map(
                       (value,idx) =>
                       <GlobalyzerIssuesHistory
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
