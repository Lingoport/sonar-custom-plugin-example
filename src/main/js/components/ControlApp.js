/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import {translate} from '../common/l10n.js'
import {findSegments} from '../api_control.js'
import {findFiles} from '../api_control.js'
import {findPrepLocale} from '../api_control.js'


import lingo_logo from '../img/logo.png'



export default class ControlApp extends React.PureComponent {

  state = {
    filelist: [],
    segments: [],
    locales:[]
  };

  componentDidMount() {

    findSegments(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          segments: valuesReturnedByAPI
        });
      }
    );


    findFiles(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          filelist: valuesReturnedByAPI
        });
      }
    );

    findPrepLocale(this.props.project).then(
      (valuesReturnedByAPI) => {
        this.setState({
          locales: valuesReturnedByAPI
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
    }

    var filecontent = new Array(this.state.filelist.length);

    for(let d = 0; d < this.state.filelist.length; d++){
      filecontent[d]  = (
        <tr>
           <td>{this.state.filelist[d].filename}</td>
         </tr>
      );
    }
   var displayName = [];
   let len1 = this.state.locales.length-1;
   if(this.state.locales[len1]!=undefined){
      displayName = this.state.locales[len1].displayNameMSR.split(";")
    }
    var localecontent = new Array(displayName.length);

    for(let d = 0; d < displayName.length; d++){
      localecontent[d]  = (
        <tr>
           <td>{displayName[d]}</td>
         </tr>
      );
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

                <div className="block" id="block_1">
                <div className="lpcontrolfile" style={{height:'100%'}}>
                <div className="widget">
                <link href="../style.css" rel="stylesheet"/>
                <h3>File Name</h3>
                <div className="lg_widget">
                <table>
                <tbody>
                  {filecontent}

                  <br/>
                </tbody></table>
                </div>
                <div className="clear"></div>
                </div>
                <div style={{clear: 'both'}}></div>
                </div>
                </div>

                <div className="block" id="block_2">
                <div className="lpcontrollocale" style={{height:'100%'}}>
                <div className="widget">
                <link href="../style.css" rel="stylesheet"/>
                <h3>Locales</h3>
                <div className="lg_widget">
                <table>
                <tbody>
                  {localecontent}

                  <br/>
                </tbody></table>
                </div>
                <div className="clear"></div>
                </div>
                <div style={{clear: 'both'}}></div>
                </div>
                </div>


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
