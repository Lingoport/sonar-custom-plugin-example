/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';


export default class LRMProductivity extends React.PureComponent {

  render() {
    if(this.props.measure.ids === undefined){
       var content = "";
    }
    else{
      var ids = this.props.measure.ids.split(";")
      var display = this.props.measure.display.split(";")
      var numWordsToTranslate = this.props.measure.numWordsToTranslate.split(";")
      var twords = this.props.measure.twords.split(";")
      var content = new Array(ids.length);

      for(let d = 0; d < ids.length; d++){
          var days = Math.round(Number(numWordsToTranslate[d])/Number(twords[d]));
        content[d]  = (
         <tr>
         <td title={display[d]}>{ids[d]}</td>
         <td>{twords[d].substring(0,twords[d].length-2)}</td>
         <td>{days} day(s) for {numWordsToTranslate[d].substring(0,numWordsToTranslate[d].length-2)} word(s)</td>
         </tr>
      );
    }
  }

    return (
      <div className="widget">
      <table>
      <h3>Resource Manager Productivity Report</h3>

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
            <th>Locale</th><th>Words Per Day </th><th>Estimated Completion Time  </th>
         </tr>
        </thead>
        <tbody>{content}</tbody></table>
        </div>
    );
  }
}
