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
    pdf:'Concatenations Selected Priority1 Selected Priority2 Selected Priority3 Selected Priority4 Selected Priority5 Selected ',
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
     $.ajax({
               type:'POST',
               url:jenkins + '/buildByToken/buildWithParameters'+"?" +'job=DashboardSavePDF&token=SAVEPDF&group_project=' + this.props.measure.project  + '&dashboard_user=' + 'dash'+'&param='+this.state.pdf,
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



changeSelect(data_id,e){
 var inputs = document.getElementsByTagName("input");
 for(var i = 0;i<inputs.length;i++){
   if(inputs[i].type.toLowerCase()=="submit" && inputs[i].id==data_id ){
     if(inputs[i].value=="Unselected"){
      inputs[i].value='Selected'
      this.state.pdf=this.state.pdf.replace(data_id+" Unselected", data_id+" Selected")
    }
    else{
      inputs[i].value='Unselected'
      this.state.pdf=this.state.pdf.replace(data_id+" Selected", data_id+" Unselected")
     }
    }
 }
 e.preventDefault();
}

  render() {
    if(this.props.measure.Scan === undefined){
        var content= (<h5>No data found</h5>);

    }else{
      var scan = this.props.measure.Scan.split(";")

      var content = new Array(scan.length);
      for(let d = 0; d < scan.length; d++){
        if(this.state.pdf.search(scan[d]+" Embedded")==-1)
          this.state.pdf = this.state.pdf + scan[d]+" Embedded "+"Selected " + scan[d] +" Locale "+"Selected "+scan[d] +" General "+"Selected "+scan[d] +" Static "+"Selected "

       content[d]  = (
          <tr height="30" className="alt">
          <td className="label">  {scan[d]}</td>
          <td className="label"><input type="submit" title="" id={scan[d]+" Embedded"} value="Selected" onClick={this.changeSelect.bind(this,scan[d]+" Embedded")}/></td>
          <td className="label"><input type="submit" title="" id={scan[d]+" Locale"} value="Selected" onClick={this.changeSelect.bind(this,scan[d]+" Locale")}/></td>
          <td className="label"><input type="submit" title="" id={scan[d]+" General"} value="Selected" onClick={this.changeSelect.bind(this,scan[d]+" General")}/></td>
          <td className="label"><input type="submit" title="" id={scan[d]+" Static"} value="Selected" onClick={this.changeSelect.bind(this,scan[d]+" Static")}/></td>
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
      <tr height="30" className="alt">
      <td className="label"><input type="submit" title="" id="Concatenations" value="Selected" onClick={this.changeSelect.bind(this,"Concatenations")}/> </td>
      <td className="label"><input type="submit" title="" id="Priority1" value="Selected" onClick={this.changeSelect.bind(this,"Priority1")}/></td>
      <td className="label"><input type="submit" title="" id="Priority2" value="Selected" onClick={this.changeSelect.bind(this,"Priority2")}/></td>
      <td className="label"><input type="submit" title="" id="Priority3" value="Selected" onClick={this.changeSelect.bind(this,"Priority3")}/></td>
      <td className="label"><input type="submit" title="" id="Priority4" value="Selected" onClick={this.changeSelect.bind(this,"Priority4")}/></td>
      <td className="label"><input type="submit" title="" id="Priority5" value="Selected" onClick={this.changeSelect.bind(this,"Priority5")}/></td>
      </tr>
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
