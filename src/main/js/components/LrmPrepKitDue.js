/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';
import {findLate} from '../api_lrm.js'
import {findWarn} from '../api_lrm.js'
import {translate} from '../common/l10n.js'

export default class LrmPrepKitDue extends React.PureComponent {

  state = {
    late: '14',
    warn:'7'
  };

componentDidMount() {
  findLate().then(
    (valuesReturnedByAPI) => {
      this.setState({
        late: valuesReturnedByAPI
      });
    }
  );

  findWarn().then(
    (valuesReturnedByAPI) => {
      this.setState({
        warn: valuesReturnedByAPI
      });
    }
  );

}


  render() {
    if(this.props.measure.localeMSR === undefined ||this.props.measure.localeMSR.length<2 ){
        var content= (
          <tr><td colspan='6'>{translate('lingoport.noprep')}</td></tr>
        );

    }else{
      var arrLocale = this.props.measure.localeMSR.split(";")
      var arrVersion = this.props.measure.versionMSR.split(";")
      var arrSentDates = this.props.measure.sentDatesMSR.split(";")
      var arrDueDates = this.props.measure.dueDatesMSR.split(";")
      var arrNumFiles = this.props.measure.numFilesMSR.split(";")
      //var arrNumWords = this.props.measure.numWordsMSR.split(";")
      var arrDisplayName = this.props.measure.displayNameMSR.split(";")
     //arrDaysLate = daysLateMSR.data.split(";").map(&:to_i)
      var arrDaysLate = this.props.measure.daysLateMSR.split(";")

    var content = new Array(arrLocale.length);
    for(let d = 0; d < arrLocale.length; d++){
      if(arrDaysLate> this.state.late){
        content[d]  = (
           <tr height="30" className="alt">
           <td className="label">  {arrVersion[d]}</td>
           <td title={arrDisplayName[d]} className="label">{arrLocale[d]}</td>
           <td className="label">{arrNumFiles[d]}</td>
           <td className="label">{arrSentDates[d]}</td>
           <td className="label">{arrDueDates[d]}</td>
           <td className="label" style={{backgroundColor: '#ff0000'}}>{arrDaysLate[d]}</td>
           </tr>);
      }else{
          if(arrDaysLate> this.state.warn){
            content[d]  = (
               <tr height="30" className="alt">
               <td className="label">  {arrVersion[d]}</td>
               <td title={arrDisplayName[d]} className="label">{arrLocale[d]}</td>
               <td className="label">{arrNumFiles[d]}</td>
               <td className="label">{arrSentDates[d]}</td>
               <td className="label">{arrDueDates[d]}</td>
               <td className="label" style={{backgroundColor: '#ffff00'}}>{arrDaysLate[d]}</td>
               </tr>
           );
          }else{
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
       }
   }
    return (

      <div className="block" id="block_2">
      <div className="lplrmprepwidget" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>
      <h3>{translate('lingoport.kitdue')}</h3>
      <div className="lg_widget">

      <table className="lg_ds_progress_bar" border="0" width="500">
      <thead>
          <tr>
          <th>Kit #</th><th>{translate('lingoport.locale')}</th><th># of<br/>{translate('lingoport.files')}</th><th>{translate('lingoport.sent')}<br/>{translate('lingoport.date')}</th><th>{translate('lingoport.due')}<br/>{translate('lingoport.date')}</th><th>{translate('lingoport.days')}<br/>{translate('lingoport.late')}</th>
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
