/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';


export default class GlobalyzerEndDate extends React.PureComponent {

  render() {
   if(this.props.measure.endDate===undefined){
     return (
       <h5 style={{textAlign: 'right'}}>NA Globalyzer License</h5>
     );
   }else{
     return (
       <h5 style={{textAlign: 'right'}}>Your Globalyzer License is valid until {this.props.measure.endDate}</h5>
     );
   }
  }
}
