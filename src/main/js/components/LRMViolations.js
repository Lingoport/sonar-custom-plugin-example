/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 <div className="lpgzsummaryscanwidget" style="height:100%;">

   <div className="widget">
     <h3>Globalyzer Scans</h3>
    <div className="lg_widget">
    <span className="big"><a href="/component_issues/index?id=" +{this.props.measure.project}+ "#resolved=false|tags=gz">

 */
import React from 'react';
import '../style.css';


export default class LRMViolations extends React.PureComponent {

  render() {
    var distri = this.props.measure.distribution.split(";")
    var ch = "";
    var chl = "";
    for(let d = 0; d < distri.length; d++){
      var char_d = distri[d]
       ch = ch + char_d.substring(char_d.length-1,char_d.length);
       ch = ch +",";
       chl = chl + char_d.substring(0,char_d.length-2);
       chl = chl +"|";
  }

    var chart = ch.substring(0,ch.length-1) + "&chl="  +chl.substring(0,chl.length-1);
    var proj = '/project/issues?id=' +this.props.measure.project+ '&resolved=false&tags=lrm-base,lrm-target'
    chart = 'https://chart.googleapis.com/chart?chs=400x160&chco=7AAF00&cht=p3&chd=t:' +chart

    return (

      <table className="lg_ds_progress_bar" border="0" width="500">
      <h3>Source Issues</h3>

      <tbody>
      <p>
       <span className="big"><a href={proj}>
       <span id="m_lngprt-gyzr-violations">{this.props.measure.violation}</span> </a></span>
      </p>
      <span><span id="m_lngprt-gyzr-violations-rci" class="alert_OK">{this.props.measure.rci}%</span> compliance</span>
      <br/>
      <span>{this.props.measure.ratio} rules activated</span>
      <br/>
          <img src={chart}/>
    </tbody></table>

    );
  }
}
