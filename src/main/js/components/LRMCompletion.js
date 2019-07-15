/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 <div className="lpgzsummaryscanwidget" style="height:100%;">

   <div className="widget">
     <h3>Globalyzer Scans</h3>
    <div className="lg_widget">

    <td title="German (Germany)">de_DE</td>

    <div style="width: 100%; height: 17px; background-color: #DDDDDD;">
    <div style="width: 96.0%; height:11px;line-height:11px;background-color: #BBBBBB;border-top:3px solid #DDDDDD;color:#4F7007;font-size:12px;">96.0%</div>

    <td>3</td>
    <td>394</td>
    <td>2212</td>
 */
import React from 'react';
import '../style.css';


export default class LRMCompletion extends React.PureComponent {

  render() {
    if(this.props.measure.files === undefined){
       var content = "";
    }
    var s1 = "width: 100%, height: 17px, background-color: #DDDDDD";
    var s2 = "width: 96.0%; height:11px,line-height:11px,background-color: #BBBBBB,border-top:3px solid #DDDDDD,color:#4F7007;font-size:12px"
/*
    else{
      var locale = this.props.measure.localeMSR.split(";")
      var numFiles = this.props.measure.numFilesMSR.split(";")
      var numKeys = this.props.measure.numKeysMSR.split(";")
      var numWords = this.props.measure.numWordsMSR.split(";")
      var displayName = this.props.measure.displayNameMSR.split(";")
    var content = new Array(locale.length);
    for(let d = 0; d < locale.length; d++){
     content[d]  = (
        <tr height="30" class="alt">
        <td className="label" title={displayName[d]}>{locale[d]}</td>
        <td className="label">{numFiles[d]}</td>
        <td className="label">{numKeys[d]}</td>
        <td className="label">{numWords[d]}</td>
        </tr>
    );
  }
}
*/
    return (
      <div className="widget">
      <table>
      <h3>Resource Manager Completion Report</h3>

      <tbody>
      <tr>
      <td>
      Base Resource Files: <span>{this.props.measure.files}</span> <br/>
      Base Resource Keys: <span>{this.props.measure.keys}</span> <br/>
      Base Resource Words: <span>{this.props.measure.words}</span> <br/>

      </td>
      <td valign="top" align="left" nowrap="">
            Last Sent Kit:  {this.props.measure.versionnum} <br/>
            Default Locale: {this.props.measure.d_local} <br/>
      </td>
      </tr>
      </tbody></table>

      <table className="lg_ds_progress_bar" border="0" width="500">
        <thead>
          <tr>
            <th>Locale</th><th>Percent Complete</th><th>Files<br/>Remaining </th><th>Keys<br/>Remaining </th><th>Words<br/>Remaining </th>
         </tr>
        </thead>
        <tbody>


        <tr>
        <td title="German (Germany)">de_DE</td>
        <td className="bar" valign="middle">
        <div style={{width: '100%', height: '17px', backgroundColor: '#DDDDDD'}}>
        <div style={{width: '96.0%', height:'11px',lineHeight:'11px',backgroundColor: '#BBBBBB',borderTop:'3px solid #DDDDDD',color:'#4F7007',fontSize:'12px'}}>96.0%</div>
        </div></td>
        <td>3</td>
        <td>394</td>
        <td>2212</td>
        </tr>

        </tbody></table>
        </div>
    );
  }
}
