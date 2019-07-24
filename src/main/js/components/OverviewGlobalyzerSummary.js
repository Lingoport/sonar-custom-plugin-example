/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';


export default class OverviewGlobalyzerSummary extends React.PureComponent {

  render() {
    var concatenation = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerESConcatCheck,gyzr:GlobalyzerGPConcatCheck,gyzr:GlobalyzerLSMConcatCheck,gyzr:GlobalyzerSFRConcatCheck'
    var Strings = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerES1Check,gyzr:GlobalyzerES2Check,gyzr:GlobalyzerES3Check'
    var Methods = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerLSM1Check,gyzr:GlobalyzerLSM2Check,gyzr:GlobalyzerLSM3Check'
    var Patterns = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerGP1Check,gyzr:GlobalyzerGP2Check,gyzr:GlobalyzerGP3Check'
    var References = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerSFR1Check,gyzr:GlobalyzerSFR2Check,gyzr:GlobalyzerSFR3Check'

    return (
      <div className="block" id="block_28">
      <div className="lpgzsummaryruleswidget" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>
      <h3>Globalyzer Summary</h3>
      <div className="lg_widget">


      <table>
      <tbody>

        <tr>
          <td>Concatenations</td>
          <td><a href ={concatenation}>{this.props.measure.concatenations}</a></td>
        </tr>

        <tr>
          <td>Embedded Strings</td>
          <td><a href ={Strings}>{this.props.measure.embedded}</a></td>
        </tr>

        <tr>
          <td>Locale-Sensitive Methods</td>
          <td><a href ={Methods}>{this.props.measure.sensitive}</a></td>
        </tr>

        <tr>
          <td>General Patterns</td>
          <td><a href ={Patterns}>{this.props.measure.general}</a></td>
        </tr>

        <tr>
          <td>Static File References</td>
          <td><a href ={References}>{this.props.measure.static}</a></td>
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
//
