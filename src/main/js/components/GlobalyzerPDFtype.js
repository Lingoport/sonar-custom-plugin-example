/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';
import {translate} from '../common/l10n.js';
import {findJenkinsURL} from '../api_lrm.js';
import $ from 'jquery';


export default class GlobalyzerPDFtype extends React.PureComponent {

  state = {
    jenkins: '',
    pdf:'',
  };

  componentDidMount() {
    findJenkinsURL().then(
      (valuesReturnedByAPI) => {
        this.setState({
          jenkins: valuesReturnedByAPI
        });
      }
    );
  }

  get(jenkins,e){
    e.preventDefault();
    var type_selection=""
    type_selection=this.generate_param(this.state.pdf)
     $.ajax({
               type:'POST',
            //   url:jenkins + '/buildByToken/buildWithParameters'+"?" +'job=DashboardSavePDF&token=SAVEPDF&group_project=' + this.props.measure.project  + '&dashboard_user=' + 'dash'+'&param='+this.state.pdf,

               url:jenkins + '/buildByToken/buildWithParameters'+"?" +'job=DashboardSavePDF&token=SAVEPDF&group_project=' + this.props.measure.project  + '&dashboard_user=' + 'dash'+'&param='+type_selection+'&issue_type='+this.state.pdf,
            //   url:'http://ec2-34-234-66-56.compute-1.amazonaws.com/jenkins'+ '/buildByToken/buildWithParameters'+"?" +'job=DashboardPrepKit&token=DASHBOARDPREPKIT&lrm_group_project=' + 'CET.OpenMind' + '&dashboard_user=' + 'dash',
               contentType:'application/x-www-form-urlencoded; charset=UTF-8',
               beforeSend: function (jqXHR, settings) {
                   var url = settings.url;
                }
             }).done(function(data, textStatus, jqXHR){
                console.log("Save PDF queued.")
            }).fail(function(jqXHR, textStatus, errorThrown ) {
             //status is always 0 for cross-domain errors so there will be no information.
             //The No Access-Control-Allow-Origin header is thrown for cross domains even though
             //we're using the build token.
                console.log("Save PDF queued if no connection error occurred.")
         });
      }

generate_param(pdf){
  var param = ""
  if(pdf.match("Concatenations Include")){
      param = param +"C,"
  }
  if(pdf.match("Priority1 Include")){
      param = param +"1,"
  }
  if(pdf.match("Priority2 Include")){
      param = param +"2,"
  }
  if(pdf.match("Priority3 Include")){
      param = param +"3,"
  }
  if(pdf.match("Priority4 Include")){
      param = param +"4,"
  }
  if(pdf.match("Priority5 Include")){
      param = param +"5"
  }
  if(param.charAt(param.length-1)==","){
     param=param.substr(0,param.length-1)
   }
   return param
}

changeSelect(data_id,e){
 var inputs = document.getElementsByTagName("input");
 for(var i = 0;i<inputs.length;i++){
   if(inputs[i].type.toLowerCase()=="submit" && inputs[i].id==data_id ){
     if(inputs[i].value=="Exclude"){
      inputs[i].value='Include'
      this.state.pdf=this.state.pdf.replace(data_id+" Exclude", data_id+" Include")
    }
    else{
      inputs[i].value='Exclude'
      this.state.pdf=this.state.pdf.replace(data_id+" Include", data_id+" Exclude")
     }
    }
 }
 e.preventDefault();
}

  render() {
    if(this.props.measure.Scan === undefined){
        var content= (<h5>No data found</h5>);
        var priority_content= (<h5>No data found</h5>);
    }else{
      var scan = this.props.measure.Scan.split(";")
      var result_priority = this.props.measure.Priority.split(";")
      var scan_priority = result_priority[0]
      var content = new Array(scan.length);
      var priority_selection = new Array(6);
      if(scan_priority.search("C")==-1){
        priority_selection[0]="Exclude"
      }else{
        priority_selection[0]="Include"
      }
      if(scan_priority.search("1")==-1){
        priority_selection[1]="Exclude"
      }else{
        priority_selection[1]="Include"
      }
      if(scan_priority.search("2")==-1){
        priority_selection[2]="Exclude"
      }else{
        priority_selection[2]="Include"
      }
      if(scan_priority.search("3")==-1){
        priority_selection[3]="Exclude"
      }else{
        priority_selection[3]="Include"
      }
      if(scan_priority.search("4")==-1){
        priority_selection[4]="Exclude"
      }else{
        priority_selection[4]="Include"
      }
      if(scan_priority.search("5")==-1){
        priority_selection[5]="Exclude"
      }else{
        priority_selection[5]="Include"
      }

      this.state.pdf = "Concatenations "+priority_selection[0]+" Priority1 "+priority_selection[1]+" Priority2 "+priority_selection[2]+" Priority3 " +priority_selection[3]+" Priority4 "+ priority_selection[4]+" Priority5 "+priority_selection[5]

      var priority_content = (
        <tr height="30" className="alt">
        <td className="label"><input style={{border:'none'}} type="submit" title="" id="Concatenations" value={priority_selection[0]} onClick={this.changeSelect.bind(this,"Concatenations")}/> </td>
        <td className="label"><input style={{border:'none'}} type="submit" title="" id="Priority1" value={priority_selection[1]} onClick={this.changeSelect.bind(this,"Priority1")}/></td>
        <td className="label"><input style={{border:'none'}} type="submit" title="" id="Priority2" value={priority_selection[2]} onClick={this.changeSelect.bind(this,"Priority2")}/></td>
        <td className="label"><input style={{border:'none'}} type="submit" title="" id="Priority3" value={priority_selection[3]} onClick={this.changeSelect.bind(this,"Priority3")}/></td>
        <td className="label"><input style={{border:'none'}} type="submit" title="" id="Priority4" value={priority_selection[4]} onClick={this.changeSelect.bind(this,"Priority4")}/></td>
        <td className="label"><input style={{border:'none'}} type="submit" title="" id="Priority5" value={priority_selection[5]} onClick={this.changeSelect.bind(this,"Priority5")}/></td>
      </tr>
      );
      var result_type = this.props.measure.Type.split(";")
      for(let d = 0; d < scan.length; d++){

        var scan_type = result_type[d];

        var select_type = new Array(4);

        if(scan_type.search("Embedded")==-1){
          select_type[0]="Exclude"
        }else{
          select_type[0]="Include"
        }
        if(scan_type.search("Locale")==-1){
          select_type[1]="Exclude"
        }else{
          select_type[1]="Include"
        }
        if(scan_type.search("General")==-1){
          select_type[2]="Exclude"
        }else{
          select_type[2]="Include"
        }
        if(scan_type.search("Static")==-1){
          select_type[3]="Exclude"
        }else{
          select_type[3]="Include"
        }


        if(this.state.pdf.search(scan[d]+" Embedded")==-1)
          this.state.pdf = this.state.pdf + scan[d]+" Embedded "+select_type[0]+" " + scan[d] +" Locale "+select_type[1]+" "+scan[d] +" General "+select_type[2]+" "+scan[d] +" Static "+select_type[3]+" "

       content[d]  = (
          <tr height="30" className="alt">
          <td className="label">  {scan[d]}</td>
          <td className="label"><input style={{border:'none'}} type="submit" title="" id={scan[d]+" Embedded"} value={select_type[0]} onClick={this.changeSelect.bind(this,scan[d]+" Embedded")}/></td>
          <td className="label"><input style={{border:'none'}} type="submit" title="" id={scan[d]+" Locale"} value={select_type[1]} onClick={this.changeSelect.bind(this,scan[d]+" Locale")}/></td>
          <td className="label"><input style={{border:'none'}} type="submit" title="" id={scan[d]+" General"} value={select_type[2]} onClick={this.changeSelect.bind(this,scan[d]+" General")}/></td>
          <td className="label"><input style={{border:'none'}} type="submit" title="" id={scan[d]+" Static"} value={select_type[3]} onClick={this.changeSelect.bind(this,scan[d]+" Static")}/></td>
          </tr>
      );
     }
   }
    return (

      <div className="block" id="block_2">
      <div className="lpgzsummaryscanwidget" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>
      <h3>Globalyzer Lite Project Definition File Settings</h3>
      <div className="lg_widget">

      <table className="lg_ds_progress_bar" border="0" width="500">
      <thead>
      <tr>
       <th>Concatenations</th>
       <th>Priority1</th>
       <th>Priority2</th>
       <th>Priority3</th>
       <th>Priority4</th>
       <th>Priority5</th>
      </tr>
      </thead>
      <tbody>

      {priority_content}

      </tbody></table>

      <table className="lg_ds_progress_bar" border="0" width="500">
      <thead>
      <tr>
       <th>{translate('lingoport.scan')}</th>
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
            <input type="submit" title="" value="Save to Project Definition File" onClick={this.get.bind(this,this.state.jenkins)}/>
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
