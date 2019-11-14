/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';
import {translate} from '../common/l10n.js'


export default class GlobalyzerEndDate extends React.PureComponent {

  render() {
   if(this.props.measure.endDate===undefined){
     return (
       <h5 style={{textAlign: 'right'}}>{translate('lingoport.nolicense')}</h5>
     );
   }else{
     return (
       <h5 style={{textAlign: 'right'}}>{translate('lingoport.licensevalid')} {this.props.measure.endDate}</h5>
     );
   }
  }
}
