/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';
import gremlinAsset1 from '../img/gremlinAsset1.png'
import gremlinAsset2 from '../img/gremlinAsset2.png'
import gremlinAsset3 from '../img/gremlinAsset3.png'
import gremlinAsset4 from '../img/gremlinAsset4.png'
import gremlinAsset5 from '../img/gremlinAsset5.png'


export default class OverviewGlobalyzerSummary extends React.PureComponent {

  render() {
    var concatenation = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerESConcatCheck,gyzr:GlobalyzerGPConcatCheck,gyzr:GlobalyzerLSMConcatCheck,gyzr:GlobalyzerSFRConcatCheck'
    var Strings = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerES1Check,gyzr:GlobalyzerES2Check,gyzr:GlobalyzerES3Check'
    var Methods = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerLSM1Check,gyzr:GlobalyzerLSM2Check,gyzr:GlobalyzerLSM3Check'
    var Patterns = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerGP1Check,gyzr:GlobalyzerGP2Check,gyzr:GlobalyzerGP3Check'
    var References = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerSFR1Check,gyzr:GlobalyzerSFR2Check,gyzr:GlobalyzerSFR3Check'
    var globalyzerPage = '/project/extension/lingoport/globalyzer_page?id=' +this.props.measure.project+ '&qualifier=TRK'

    if(this.props.measure.embedded===undefined){
      return (
        <div className="block" id="block_28">
        <div className="lpgzsummaryruleswidget" style={{height:'100%'}}>
        <div className="widget">
        <link href="../style.css" rel="stylesheet"/>
        <h3><a href ={globalyzerPage}>Globalyzer Summary</a></h3>
        <div className="lg_widget">
        <h5>No issues found</h5>
        </div>
        <div className="clear"></div>
        </div>
        <div style={{clear: 'both'}}></div>
        </div>
        </div>

      );
    }


    return (
      <div className="block" id="block_28">
      <div className="lpgzsummaryruleswidget" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>
      <h3><a href ={globalyzerPage}>Globalyzer Summary</a></h3>
      <div className="lg_widget">


      <table>
      <tbody>

        <tr>
      <td>
      <a href="https://wiki.lingoport.com/Gremlins#I18n_Gremlins"><img style={{width:'25px',height:'30px'}} src={gremlinAsset1} alt=""/></a>
      </td>
          <td>Concatenations</td>
          <td><a href ={concatenation}>{this.props.measure.concatenations}</a></td>
        </tr>

        <tr>
        <td>
        <a href="https://wiki.lingoport.com/Gremlins#I18n_Gremlins"><img style={{width:'25px',height:'30px'}} src={gremlinAsset2} alt=""/></a></td>
          <td>Embedded Strings</td>
          <td><a href ={Strings}>{this.props.measure.embedded}</a></td>
        </tr>

        <tr>
        <td>
        <a href="https://wiki.lingoport.com/Gremlins#I18n_Gremlins"><img style={{width:'25px',height:'30px'}} src={gremlinAsset3} alt=""/></a></td>
          <td>Locale-Sensitive Methods</td>
          <td><a href ={Methods}>{this.props.measure.sensitive}</a></td>
        </tr>

        <tr>
        <td>
        <a href="https://wiki.lingoport.com/Gremlins#I18n_Gremlins"><img style={{width:'25px',height:'30px'}} src={gremlinAsset4} alt=""/></a></td>
          <td>General Patterns</td>
          <td><a href ={Patterns}>{this.props.measure.general}</a></td>
        </tr>

        <tr>
        <td>
        <a href="https://wiki.lingoport.com/Gremlins#I18n_Gremlins"><img style={{width:'25px',height:'30px'}} src={gremlinAsset5} alt=""/></a></td>
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
