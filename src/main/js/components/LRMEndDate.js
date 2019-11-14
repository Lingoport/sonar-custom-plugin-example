/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';
import {translate} from '../common/l10n.js'

export default class LRMEndDate extends React.PureComponent {

  render() {

    if(this.props.measure.endDate===undefined){
      return (
        <h5 style={{textAlign: 'right'}}>{translate('lingoport.lrmlicense')}</h5>
      );
    }else{
      return (
        <h5 style={{textAlign: 'right'}}>{translate('lingoport.lrmlicensevalid')} {this.props.measure.endDate}.  {translate('lingoport.lqalicensevalid')} {this.props.measure.lqaendDate}</h5>
      );
    }
  }
}
