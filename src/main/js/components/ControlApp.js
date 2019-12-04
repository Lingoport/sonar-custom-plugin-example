/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import {translate} from '../common/l10n.js'
import {findSegments} from '../api_control.js'
import {findlpLicense} from '../api.js'

import OverviewGlobalyzerSummary from './OverviewGlobalyzerSummary'
import OverviewLRMSummary from './OverviewLRMSummary'
import OverviewHistory from './OverviewHistory'
import OverviewLicense from './OverviewLicense'
import lingo_logo from '../img/logo.png'



export default class ControlApp extends React.PureComponent {

  state = {
    filelist: [],
    segments: [],
    license:[]
  };

  componentDidMount() {

    findSegments(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          segments: valuesReturnedByAPI
        });
      }
    );


    findlpLicense(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          license: valuesReturnedByAPI
        });
      }
    );
  }



  render() {
    var content = new Array(this.state.segments.length);

    for(let d = 0; d < this.state.segments.length; d++){
      content[d]  = (
        <tr>
           <td>{this.state.segments[d].messageinfo}</td>
         </tr>
      );
      console.log(this.state.segments[d].messageinfo);
    }
    // Data Gathered: {JSON.stringify(this.state.data)}
    return (
      <div id="body" className="page-container">
      <div id="content">
      <div className="page" id="dashboard">
        <span className="hidden" id="is-project-dashboard"></span>
        <header className="page-header">
        <img style={{width:'165px',height:'35px',textAlign: 'right'}} src={lingo_logo} alt=""/>
          </header>
          <div style={{width: '100%',display: 'block', float: 'none'}}>

              <div className="dashboard-column-wrapper" style={{width: '20%',margin: '0 -1px 0 0',float:'left'}}>
                <div className="dashboard-column" id="dashboard-column-1" style={{margin: '0 5px 0 0px',padding:'0',overflow:'visible'}}>


                {this.state.license.map(
                    (value,idx) =>
                    <OverviewLicense
                      measure={value}
                      key={idx}
                    />
                    )
                }
                </div>
               </div>


               <div className="dashboard-column-wrapper" style={{width: '70%',margin: '0 -1px 0 0',float:'left'}}>
                 <div className="dashboard-column" id="dashboard-column-2" style={{margin: '0 0px 0 5px',float:'rignt',padding:'0',overflow:'visible'}}>

                    <h5>{content}</h5>

                  </div>
                </div>
              </div>
           </div>
         </div>
      </div>
    );
  }
}
