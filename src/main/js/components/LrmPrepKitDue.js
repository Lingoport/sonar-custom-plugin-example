/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';


export default class LrmPrepKitDue extends React.PureComponent {

  render() {
    if(this.props.measure.localeMSR === undefined ||this.props.measure.localeMSR.length<2 ){
        var content= (
          <tr><td colspan='6'>No outstanding prep kits</td></tr>
        );

    }else{
      var arrLocale = this.props.measure.localeMSR.split(";")
      var arrVersion = this.props.measure.versionMSR.split(";")
      var arrSentDates = this.props.measure.sentDatesMSR.split(";")
      var arrDueDates = this.props.measure.dueDatesMSR.split(";")
      var arrNumFiles = this.props.measure.numFilesMSR.split(";")
      //var arrNumWords = this.props.measure.numWordsMSR.split(";")
      var arrDisplayName = this.props.measure.displayNameMSR.split(";")
    //  arrDaysLate = daysLateMSR.data.split(";").map(&:to_i)
     var arrDaysLate = this.props.measure.daysLateMSR.split(";")

    var content = new Array(scan.length);
    for(let d = 0; d < scan.length; d++){
     content[d]  = (
        <tr height="30" className="alt">
        <td className="label">  {arrVersion[d]}</td>
        <td title={arrDisplayName[d]} className="label">{arrLocale[d]}</td>
        <td className="label">{arrNumFiles[d]}</td>
        <td className="label">{arrSentDates[d]}</td>
        <td className="label">{arrDueDates[d]}</td>
        <td className="label">{arrDaysLate[d]}</td>
        </tr>
    );
  }
}
    return (

      <div className="block" id="block_2">
      <div className="lplrmprepwidget" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>
      <h3>Prep Kit Due Dates</h3>
      <div className="lg_widget">

      <table className="lg_ds_progress_bar" border="0" width="500">
      <thead>
          <tr>
          <th>Kit #</th><th>Locale</th><th># of<br/>Files</th><th>Sent<br/>Date (UTC)</th><th>Due<br/>Date (UTC)</th><th>Days<br/>Late</th>
          </tr>
      </thead>
      <tbody>
          {content}
      </tbody></table>

      </div>
      <div className="clear"></div>
      </div>
      <div style={{clear: 'both'}}></div>
      </div>
      </div>

    );
  }
}
