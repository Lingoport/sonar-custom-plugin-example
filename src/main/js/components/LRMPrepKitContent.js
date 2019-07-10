/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 <div className="lpgzsummaryscanwidget" style="height:100%;">

   <div className="widget">
     <h3>Globalyzer Scans</h3>
    <div className="lg_widget">
 */
import React from 'react';
import '../style.css';


export default class LRMPrepKitContent extends React.PureComponent {

  render() {
    if(this.props.measure.localeMSR === undefined){
       var content = "";
    }else{
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

    return (
      <table className="lg_ds_progress_bar" border="0" width="500">
      <thead>
      <tr>
          <th>Locale</th><th># of<br/>Files</th><th># of<br/>Keys</th><th># of<br/>Words</th>
      </tr>
      </thead>
      <tbody>
          {content}
      </tbody></table>

    );
  }
}
