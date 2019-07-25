/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import { Chart } from "react-google-charts";
import '../style.css';


export default class OverviewHistory extends React.PureComponent {

  render() {

    if(this.props.measure.gdate === undefined){
       return(
         <div className="block" id="block_44">
         <div className="timeline" style={{height:'100%'}}>
         <div className="widget">
         <link href="../style.css" rel="stylesheet"/>
         <h5>No data found</h5>
         <div className="clear"></div>
         </div>
         <div style={{clear: 'both'}}></div>
         </div>
         </div>
       );
    }else{
    var content = new Array(this.props.measure.gdate.length+1);
    content[0] = ['x', 'Globalyzer Issues','LRM Remaining Words'];
    let m = 0;
    for(let d = 1; d < content.length; d++){
      content[d]  = (
        [new Date(this.props.measure.gdate[m]), this.props.measure.gz[m],this.props.measure.lrm[m]]
    );
     m++;
  }
}

    return (
      <div className="block" id="block_44">
      <div className="timeline" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>

      <Chart
        width={'550px'}
        height={'280px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={content}
        options={{
          legend: { position: 'bottom' },
          chart: {
           title: 'Remaining Words',
          },
        }}
      />

      <div className="clear"></div>
      </div>
      <div style={{clear: 'both'}}></div>
      </div>
      </div>
    );
  }
}
