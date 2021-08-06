/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';
import {translate} from '../common/l10n.js'

export default class GlobalyzerPDFtype extends React.PureComponent {

  state = {
    types: '',
    wordcost:'0',
  };
/*
  get(types,e){
    this.disabledButton();
    e.preventDefault();
     $.ajax({
               type:'POST',
               url:jenkins + '/buildByToken/buildWithParameters'+"?" +'job=DashboardPrepKit&token=DASHBOARDPREPKIT&lrm_group_project=' + this.props.measure.project  + '&dashboard_user=' + 'dash',
            //   url:'http://ec2-34-234-66-56.compute-1.amazonaws.com/jenkins'+ '/buildByToken/buildWithParameters'+"?" +'job=DashboardPrepKit&token=DASHBOARDPREPKIT&lrm_group_project=' + 'CET.OpenMind' + '&dashboard_user=' + 'dash',
               contentType:'application/x-www-form-urlencoded; charset=UTF-8',
               beforeSend: function (jqXHR, settings) {
                   var url = settings.url;
                }
             }).done(function(data, textStatus, jqXHR){
                console.log("Prep Kit job queued.")
            }).fail(function(jqXHR, textStatus, errorThrown ) {
             //status is always 0 for cross-domain errors so there will be no information.
             //The No Access-Control-Allow-Origin header is thrown for cross domains even though
             //we're using the build token.
                console.log("Prep Kit job queued if no connection error occurred.")
         });
      }
*/
  render() {
    if(this.props.measure.Scan === undefined){
        var content= (<h5>No data found</h5>);

    }else{
      var scan = this.props.measure.Scan.split(";")
      var ruleset = this.props.measure.RuleSet.split(";")
      var issues = this.props.measure.Issues.split(";")
      var lines = this.props.measure.Lines.split(";")
      var files = this.props.measure.Files.split(";")
      var local = this.props.measure.local.split(";")
      var content = new Array(scan.length);
      for(let d = 0; d < scan.length; d++){
        if(local[d]==='1')
          ruleset[d] = ruleset[d]+'(Local)';
        else {
          ruleset[d] = ruleset[d]+'(Remote)';
        }
       content[d]  = (
          <tr height="30" className="alt">
          <td className="label">  {scan[d]}</td>
          <td className="label">{ruleset[d]}</td>
          <td className="label"><input type="CheckBox" name="hobby" value="1"/></td>
          <td className="label"><input type="CheckBox" name="hobby" value="1" checked="checked"/></td>
          <td className="label"><input type="CheckBox" name="hobby" value="1"/></td>
          <td className="label"><input type="CheckBox" name="hobby" value="1"/></td>
          <td className="label"><input type="CheckBox" name="hobby" value="1"/></td>
          </tr>
      );
     }
   }
    return (

      <div className="block" id="block_2">
      <div className="lpgzsummaryscanwidget" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>
      <h3>Globalyzer Scans Type of Issues Selection</h3>
      <div className="lg_widget">

      <table className="lg_ds_progress_bar" border="0" width="500">
      <thead>
      <tr>
       <th>{translate('lingoport.scan')}</th>
       <th>{translate('lingoport.ruleset')}</th>
       <th>Concatenations</th>
       <th>Embedded Strings</th>
       <th>Locale-Sensitive Methods</th>
       <th>General Patterns</th>
       <th>Static File References</th>
      </tr>
      </thead>
      <tbody>
          {content}
          <td valign="top" align="left" nowrap="" colspan="4">
            <div id="prepkit">
            <input type="submit" title="" value="Save to Project Definition File"/>
            <a></a>
            </div>
          </td>
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
