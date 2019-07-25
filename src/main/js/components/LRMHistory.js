/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import { Chart } from "react-google-charts";
import '../style.css';


export default class LRMHistory extends React.PureComponent {

  render() {

    if(this.props.measure.gdate === undefined){
       var content = "";
    }else{
    var content = new Array(this.props.measure.gdate.length+1);
    content[0] = ['x', 'Remaining Words','Remaining Files'];
    let m = 0;
    for(let d = 1; d < content.length; d++){
      content[d]  = (
        [new Date(this.props.measure.gdate[m]), this.props.measure.words[m],this.props.measure.files[m]]
    );
     m++;
  }
}

    return (
      <table className="lg_ds_progress_bar" border="0" width="500">
      <thead>
      <tr>

      </tr>

      <Chart
        width={'480px'}
        height={'250px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={content}
        options={{
          chart: {
           title: 'LRM Remaining Words',
          },
        }}
      />

      </thead>
      <tbody>
      </tbody></table>

    );
  }
}
