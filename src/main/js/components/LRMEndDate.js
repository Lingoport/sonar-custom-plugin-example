/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';


export default class LRMEndDate extends React.PureComponent {

  render() {

    if(this.props.measure.endDate===undefined){
      return (
        <h5 style={{textAlign: 'right'}}>NA LRM License</h5>
      );
    }else{
      return (
        <h5 style={{textAlign: 'right'}}>LRM License valid until {this.props.measure.endDate}.  InContextQA License valid until {this.props.measure.lqaendDate}</h5>
      );
    }
  }
}
