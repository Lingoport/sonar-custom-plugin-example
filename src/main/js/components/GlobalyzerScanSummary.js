/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';


export default class GlobalyzerScanSummary extends React.PureComponent {

  render() {
    if(this.props.measure.Scan === undefined){
      return (
        <div className="block" id="block_2">
        <div className="lpgzsummaryscanwidget" style={{height:'100%'}}>
        <div className="widget">
        <link href="../style.css" rel="stylesheet"/>
        <div className="lg_widget">
        <h5>No issues found</h5>
        </div>
        <div className="clear"></div>
        </div>
        <div style={{clear: 'both'}}></div>
        </div>
        </div>

      );
    }else{
      var scan = this.props.measure.Scan.split(";")
      var ruleset = this.props.measure.RuleSet.split(";")
      var issues = this.props.measure.Issues.split(";")
      var lines = this.props.measure.Lines.split(";")
      var files = this.props.measure.Files.split(";")
    var content = new Array(scan.length);
    for(let d = 0; d < scan.length; d++){
     content[d]  = (
        <tr height="30" class="alt">
        <td className="label">{scan[d]}</td>
        <td className="label">{ruleset[d]}</td>
        <td className="label">{issues[d]}</td>
        <td className="label">{lines[d]}</td>
        <td className="label">{files[d]}</td>
        </tr>
    );
  }
}
    return (

      <div className="block" id="block_2">
      <div className="lpgzsummaryscanwidget" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>
      <h3>Globalyzer Scans</h3>
      <div className="lg_widget">

      <table className="lg_ds_progress_bar" border="0" width="500">
      <thead>
      <tr>
       <th>Scan</th><th>Rule Set</th><th>Issues</th><th>Lines</th><th>Files</th>
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
