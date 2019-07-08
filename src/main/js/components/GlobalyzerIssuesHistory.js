/*
 * Copyright (C) 2017-2017 SonarSource SA
 * All rights reserved
 * mailto:info AT sonarsource DOT com
 <div className="lpgzsummaryscanwidget" style="height:100%;">

   <div className="widget">
     <h3>Globalyzer Scans</h3>
    <div className="lg_widget">
    [
      ['x', 'Globalyzer Issues'],
      [new Date(this.props.measure.gdate[0].substring(0,4), Number(this.props.measure.gdate[1].substring(5,7))-1, this.props.measure.gdate[2].substring(8,10)), this.props.measure.value[0]],
      [new Date(2019, 9, 5), 10],
      [new Date(2019, 9, 5), 23],
      [new Date(2019, 10, 25), 17],
      [new Date(2019, 11, 9), 27],
      [new Date(2019, 11, 20), 87],
      [new Date(2020, 0, 5), 67],
      [new Date(2020, 0, 30), 47],
      [new Date(2020, 1, 2), 37],
      [new Date(this.props.measure.gdate[m].substring(0,4), Number(this.props.measure.gdate[m].substring(5,7))-1, this.props.measure.gdate[m].substring(8,10)), this.props.measure.value[m]]

    ]
 */
import React from 'react';
import { Chart } from "react-google-charts";
import '../style.css';


export default class GlobalyzerIssuesHistory extends React.PureComponent {

  render() {

    if(this.props.measure.gdate === undefined){
       var content = "";
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
      <table className="lg_ds_progress_bar" border="0" width="500">
      <thead>
      <tr>

      </tr>

      <Chart
        width={'430px'}
        height={'250px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={content}
        options={{
          chart: {
           title: 'Globalyzer Issues',
          },
        }}
      />

      </thead>
      <tbody>
      </tbody></table>

    );
  }
}
