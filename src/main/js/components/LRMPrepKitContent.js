/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';
import {findJenkinsURL} from '../api_lrm.js'
import $ from 'jquery';


export default class LRMPrepKitContent extends React.PureComponent {
  state = {
    jenkins: '',
  };
//  var jobName=document.getElementById("job_name").value;
//  var dashboardUser=document.getElementById("current_user").value;
//  var formData = 'job=DashboardPrepKit&token=DASHBOARDPREPKIT&lrm_group_project=' + jobName + '&dashboard_user=' + dashboardUser;

//  var urljob= url + "/buildByToken/buildWithParameters";

componentDidMount() {
  findJenkinsURL().then(
    (valuesReturnedByAPI) => {
      this.setState({
        jenkins: valuesReturnedByAPI
      });
    }
  );
}

get(){
   $.ajax({
             type:'POST',
             url:this.state.jenkins + '/buildByToken/buildWithParameters'+"?" +'job=DashboardPrepKit&token=DASHBOARDPREPKIT&lrm_group_project=' + this.props.measure.project  + '&dashboard_user=' + 'dash',
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

  render() {
    if(this.props.measure.localeMSR === undefined){
      return (
        <div className="block" id="block_6">
        <div className="lplrmprewidget" style={{height:'100%'}}>
        <div className="widget">
        <link href="../style.css" rel="stylesheet"/>
        <h3>Next Prep Kit Content</h3>
        <div className="lg_widget">
        <table className="lg_ds_progress_bar" border="0" width="500">
        <thead>
        <tr>
            <th>Locale </th><th># of<br/>Files</th><th># of<br/>Keys</th><th># of<br/>Words</th>
        </tr>
        </thead>
        <tbody>
         <h5>No data found</h5>
        </tbody></table>
        </div>
        <div className="clear"></div>
        </div>
        <div style={{clear: 'both'}}></div>
        </div>
        </div>

      );
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
      <div className="block" id="block_6">
      <div className="lplrmprewidget" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>
      <h3>Next Prep Kit Content</h3>
      <div className="lg_widget">


      <table className="lg_ds_progress_bar" border="0" width="500">
      <thead>
      <tr>
          <th>Locale </th><th># of<br/>Files</th><th># of<br/>Keys</th><th># of<br/>Words</th>
      </tr>
      </thead>
      <tbody>
          {content}
      <td valign="top" align="left" nowrap="" colspan="4">
      <div id="prepkit">
      <input type="submit" value="Prep Kit" onClick={this.get}/>
       <a target="_blank" title="Jenkins URL value in LRM global setting-Click to Verify" href={this.state.jenkins}>"Jenkins URL: {this.state.jenkins}"</a>
       </div></td>
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
