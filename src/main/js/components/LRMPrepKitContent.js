/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 <div className="lpgzsummaryscanwidget" style="height:100%;">

   <div className="widget">
     <h3>Globalyzer Scans</h3>
    <div className="lg_widget">
    axios({
    method: 'post',
    url: urljob,
    data: formData,
    content-type:'application/x-www-form-urlencoded; charset=UTF-8',
    beforeSend: function (jqXHR, settings) {
                    url = settings.url + "?" + settings.data;
                }
             }).done(function(data, textStatus, jqXHR){
                console.log("Prep Kit job queued.")
            }).fail(function(jqXHR, textStatus, errorThrown ) {
                //status is always 0 for cross-domain errors so there will be no information.
                //The No Access-Control-Allow-Origin header is thrown for cross domains even though
                //we're using the build token.
                console.log("Prep Kit job queued if no connection error occurred.")
          });
 */
import React from 'react';
import '../style.css';
import {findJenkinsURL} from '../api_lrm.js'
import axios from 'axios';
import $ from 'jquery';


export default class LRMPrepKitContent extends React.PureComponent {
  state = {
    jenkins: '',
    url: 'http://ec2-34-234-66-56.compute-1.amazonaws.com/jenkins',
    formData : 'job=DashboardPrepKit&token=DASHBOARDPREPKIT&lrm_group_project=' + 'CET.OpenMind' + '&dashboard_user=' + 'dash',
    urljob: 'http://ec2-34-234-66-56.compute-1.amazonaws.com/jenkins' + '/buildByToken/buildWithParameters'
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
/*
axios({
  method: 'post',
  url: 'http://ec2-34-234-66-56.compute-1.amazonaws.com/jenkins' + '/buildByToken/buildWithParameters',
  data: 'job=DashboardPrepKit&token=DASHBOARDPREPKIT&lrm_group_project=' + 'CET.OpenMind' + '&dashboard_user=' + 'dash',
  beforeSend: function (jqXHR, settings) {
                  url = settings.url + "?" + settings.data;
              }
           }).then(function (response) {
             console.log("Prep Kit job queued.");
           })
           .catch(function (error) {
             console.log("Prep Kit job queued if no connection error occurred.");
           });
}
*/
$.ajax({
           type:'POST',
           url:'http://ec2-34-234-66-56.compute-1.amazonaws.com/jenkins' + '/buildByToken/buildWithParameters'+"?" +'job=DashboardPrepKit&token=DASHBOARDPREPKIT&lrm_group_project=' + 'CET.OpenMind' + '&dashboard_user=' + 'dash',
           contentType:'application/x-www-form-urlencoded; charset=UTF-8',
           beforeSend: function (jqXHR, settings) {
               //url = 'http://ec2-34-234-66-56.compute-1.amazonaws.com/jenkins' + '/buildByToken/buildWithParameters' + "?" + 'job=DashboardPrepKit&token=DASHBOARDPREPKIT&lrm_group_project=' + 'CET.OpenMind' + '&dashboard_user=' + 'dash';
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
      <input type="button" value="Prep Kit" onClick={this.get}/>
      <tr>
          <th>Locale {this.state.jenkins}</th><th># of<br/>Files</th><th># of<br/>Keys</th><th># of<br/>Words</th>
      </tr>
      </thead>
      <tbody>
          {content}
      </tbody></table>

    );
  }
}
