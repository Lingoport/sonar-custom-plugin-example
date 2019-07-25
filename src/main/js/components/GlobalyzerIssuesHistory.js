/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import { Chart } from "react-google-charts";
import '../style.css';


export default class GlobalyzerIssuesHistory extends React.PureComponent {

  render() {

    if(this.props.measure.gdate === undefined){
      return(
        <div className="block" id="block_4">
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
    content[0] = ['x', 'Globalyzer Issues'];
    let m = 0;
    for(let d = 1; d < content.length; d++){
      content[d]  = (
        [new Date(this.props.measure.gdate[m]), this.props.measure.value[m]]
    );
     m++;
  }
}

    return (
      <div className="block" id="block_4">
      <div className="timeline" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>

      <Chart
        width={'430px'}
        height={'250px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={content}
        options={{
          legend: { position: 'bottom' },
          chart: {
           title: 'Globalyzer Issues',
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
