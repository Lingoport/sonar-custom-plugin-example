/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';
import {translate} from '../common/l10n.js'

export default class OverviewLRMSummary extends React.PureComponent {

  render() {
    var LRMPage = '/project/extension/lingoport/lrm_page?id=' +this.props.measure.project+ '&qualifier=TRK'
    var file = this.props.measure.nbfilesMSR

    if(file===undefined){
      return (
        <div className="block" id="block_29">
        <div className="lplrmsummaryruleswidget" style={{height:'100%'}}>
        <div className="widget">
        <link href="../style.css" rel="stylesheet"/>
        <h3><a href ={LRMPage}>{translate('lingoport.summaryreport')}</a></h3>
        <div className="lg_widget">
        <h5>{translate('lingoport.nodata')}</h5>
        </div>
        <div className="clear"></div>
        </div>
        <div style={{clear: 'both'}}></div>
        </div>
        </div>

      );
    }

    return (
      <div className="block" id="block_29">
      <div className="lplrmsummaryruleswidget" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>
      <h3><a href ={LRMPage}>{translate('lingoport.summaryreport')}</a></h3>
      <div className="lg_widget">


      <table>
      <tbody>

        <tr>
          <td>{translate('lingoport.defaultlocale')}:	</td>
          <td>{this.props.measure.dfltLocaleMSR}</td>
        </tr>

        <tr>
          <td>{translate('lingoport.basefile')}:</td>
          <td>{this.props.measure.nbfilesMSR}</td>
        </tr>

        <tr>
          <td>{translate('lingoport.baseword')}:</td>
          <td>{this.props.measure.nbwordsMSR}</td>
        </tr>

        <tr>
          <td>{translate('lingoport.targetlocale')}</td>
          <td>{this.props.measure.nblocalesMSR}</td>
        </tr>

        <tr>
          <td>% {translate('lingoport.complete')}</td>
          <td>{this.props.measure.avgCompleteMSR}%</td>
        </tr>

        <tr>
          <td>{translate('lingoport.lastprepversion')}</td>
          <td>{this.props.measure.versionNumMSR}</td>
        </tr>

        <tr>
          <td>{translate('lingoport.lastprepdate')}</td>
          <td>{this.props.measure.lastSendMSR}</td>
        </tr>


        <br/>

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
