/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';
import {translate} from '../common/l10n.js'

export default class GlobalyzerRulesSummary extends React.PureComponent {

  render() {
    var concatenation = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerESConcatCheck,gyzr:GlobalyzerGPConcatCheck,gyzr:GlobalyzerLSMConcatCheck,gyzr:GlobalyzerSFRConcatCheck'
    var Strings = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerES1Check,gyzr:GlobalyzerES2Check,gyzr:GlobalyzerES3Check'
    var Methods = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerLSM1Check,gyzr:GlobalyzerLSM2Check,gyzr:GlobalyzerLSM3Check'
    var Patterns = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerGP1Check,gyzr:GlobalyzerGP2Check,gyzr:GlobalyzerGP3Check'
    var References = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&rules=gyzr:GlobalyzerSFR1Check,gyzr:GlobalyzerSFR2Check,gyzr:GlobalyzerSFR3Check'

    var total = Number(this.props.measure.concatenations) + Number(this.props.measure.embedded) + Number(this.props.measure.sensitive) + Number(this.props.measure.general) + Number(this.props.measure.static)
    var con = (Number(this.props.measure.concatenations) * 100)/total
    var emb = (Number(this.props.measure.embedded) * 100)/total
    var sen = (Number(this.props.measure.sensitive) * 100)/total
    var gen = (Number(this.props.measure.general) * 100)/total
    var sta =  (Number(this.props.measure.static) * 100)/total

    var chart = emb + ',' + sen + ',' + gen +',' + sta + ',' + con

    chart = 'https://chart.googleapis.com/chart?chs=400x160&chco=7AAF00&cht=p3&chd=t:' +chart + '&chl=Strings|Methods|Patterns|References|Concat'
    return (
      <table className="lg_ds_progress_bar" border="0" width="500">
      <tbody>

        <tr>
          <td>{translate('lingoport.concatenations')}</td>
          <td><a href ={concatenation}>{this.props.measure.concatenations}</a></td>
        </tr>

        <tr>
          <td>{translate('lingoport.embedded')}</td>
          <td><a href ={Strings}>{this.props.measure.embedded}</a></td>
        </tr>

        <tr>
          <td>{translate('lingoport.sensitive')}</td>
          <td><a href ={Methods}>{this.props.measure.sensitive}</a></td>
        </tr>

        <tr>
          <td>{translate('lingoport.general')}</td>
          <td><a href ={Patterns}>{this.props.measure.general}</a></td>
        </tr>

        <tr>
          <td>{translate('lingoport.static')}</td>
          <td><a href ={References}>{this.props.measure.static}</a></td>
        </tr>
        <br/>
            <img src={chart}/>

      </tbody></table>
    );
  }
}
