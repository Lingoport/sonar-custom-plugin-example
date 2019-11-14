/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';
import {translate} from '../common/l10n.js'

export default class OverviewLicense extends React.PureComponent {
  render() {
    var gyzrExist = this.props.measure.gyzrExists;
    var current = new Date();

    if(gyzrExist===undefined&&this.props.measure.lrmExists===undefined){
      console.log(current);
      return (
        <div className="block" id="block_1">
        <div className="lplicensewidget" style={{height:'100%'}}>
        <div className="widget">
        <link href="../style.css" rel="stylesheet"/>
        <div className="lg_widget">
        <h5>{translate('lingoport.nodata')}</h5>
        </div>
        <div className="clear"></div>
        </div>
        <div style={{clear: 'both'}}></div>
        </div>
        </div>

      );
    }else if(gyzrExist===undefined){
      var lrmDate = new Date(this.props.measure.lrmEndDate);
      var diff = lrmDate - current;
      var content = '';
      if(diff>2592000000){
          content= (
          <tr>
            <td>{translate('lingoport.lrmlicensedate')}:		</td>
            <td>{this.props.measure.lrmEndDate}</td>
          </tr>
         );
    }else{
      if(diff<0){
        content= (
         <tr>
         <td  style={{backgroundColor:'#ff0000'}}>{translate('lingoport.lrmexpireddate')}:		</td>
           <td>{this.props.measure.lrmEndDate}</td>
         </tr>
       );
      }else{//warning
        content= (
         <tr>
         <td  style={{backgroundColor:'#ffff00'}}>{translate('lingoport.lrmlicensedate')}:		</td>
           <td>{this.props.measure.lrmEndDate}</td>
         </tr>
       );
      }
    }
    return (
      <div className="block" id="block_1">
      <div className="lplicensewidget" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>
      <h3>Licensing</h3>
      <div className="lg_widget">
      <table>
      <tbody>
        {content}
        <tr>
          <td>{translate('lingoport.lrmversion')}	</td>
          <td>{this.props.measure.lrmVersion}</td>
        </tr>
        <tr>
          <td>{translate('lingoport.lrmCompanyName')}</td>
          <td>{this.props.measure.lrmCompanyName}</td>
        </tr>
        <tr>
          <td>{translate('lingoport.lrmProjects')}	</td>
          <td>{this.props.measure.lrmProjects}</td>
        </tr>
        <tr>
          <td>{translate('lingoport.lrmLqaEndDate')}	</td>
          <td>{this.props.measure.lrmLqaEndDate}</td>
        </tr>
        </tbody></table>
         </div>
         <div className="clear"></div>
         </div>
         <div style={{clear: 'both'}}></div>
         </div>
         </div>
    );
  }else if(this.props.measure.lrmExists===undefined){
    var gzDate = new Date(this.props.measure.gyzrEndDate);
    var diff = gzDate - current;
    var content = '';
    if(diff>2592000000){
        content= (
         <tr>
         <td>{translate('lingoport.gzlicensedate')}:		</td>
           <td>{this.props.measure.gyzrEndDate}</td>
         </tr>
       );
  }else{
    if(diff<0){
      content= (
       <tr>
       <td  style={{backgroundColor:'#ff0000'}}>{translate('lingoport.gzexpireddate')}:		</td>
         <td>{this.props.measure.gyzrEndDate}</td>
       </tr>
     );
    }else{//warning
      content= (
       <tr>
       <td  style={{backgroundColor:'#ffff00'}}>{translate('lingoport.gzlicensedate')}:		</td>
         <td>{this.props.measure.gyzrEndDate}</td>
       </tr>
     );
    }
  }
    return (
      <div className="block" id="block_1">
      <div className="lplicensewidget" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>
      <h3>Licensing</h3>
      <div className="lg_widget">
      <table>
      <tbody>
        {content}
        <tr>
          <td>{translate('lingoport.gyzrClientVersion')}		</td>
          <td>{this.props.measure.gyzrClientVersion}</td>
        </tr>
        <tr>
          <td>{translate('lingoport.gyzrCompanyName')}	</td>
          <td>{this.props.measure.gyzrCompanyName}</td>
        </tr>
        <tr>
          <td>{translate('lingoport.gyzrProjects')}		</td>
          <td>{this.props.measure.gyzrProjects}</td>
        </tr>
        <tr>
          <td>{translate('lingoport.gyzrProducts')}	</td>
          <td>{this.props.measure.gyzrProducts}</td>
        </tr>
        <tr>
          <td>{translate('lingoport.gyzrRepo')}	</td>
          <td>{this.props.measure.gyzrRepo}</td>
        </tr>
        <tr>
          <td>{translate('lingoport.gyzrLines')}	</td>
          <td>{this.props.measure.gyzrLines}</td>
        </tr>
        <br/>
        </tbody></table>
         </div>
         <div className="clear"></div>
         </div>
         <div style={{clear: 'both'}}></div>
         </div>
         </div>
    );
  }else{
    var lrmDate = new Date(this.props.measure.lrmEndDate);
    var diffl = lrmDate - current;
    var contentl = '';
    if(diffl>2592000000){
        contentl= (
        <tr>
          <td>{translate('lingoport.lrmlicensedate')}:		</td>
          <td>{this.props.measure.lrmEndDate}</td>
        </tr>
       );
  }else{
    if(diffl<0){
      contentl= (
       <tr>
       <td  style={{backgroundColor:'#ff0000'}}>{translate('lingoport.lrmexpireddate')}:		</td>
         <td>{this.props.measure.lrmEndDate}</td>
       </tr>
     );
    }else{//warning
      contentl= (
       <tr>
       <td  style={{backgroundColor:'#ffff00'}}>{translate('lingoport.lrmlicensedate')}:		</td>
         <td>{this.props.measure.lrmEndDate}</td>
       </tr>
     );
    }
  }


    var gzDate = new Date(this.props.measure.gyzrEndDate);
    var diff = gzDate - current;
    var content = '';
    if(diff>2592000000){
        content= (
         <tr>
         <td>{translate('lingoport.gzlicensedate')}:		</td>
           <td>{this.props.measure.gyzrEndDate}</td>
         </tr>
       );
  }else{
    if(diff<0){
      content= (
       <tr>
       <td  style={{backgroundColor:'#ff0000'}}>{translate('lingoport.gzexpireddate')}:		</td>
         <td>{this.props.measure.gyzrEndDate}</td>
       </tr>
     );
    }else{//warning
      content= (
       <tr>
       <td  style={{backgroundColor:'#ffff00'}}>{translate('lingoport.gzlicensedate')}:		</td>
         <td>{this.props.measure.gyzrEndDate}</td>
       </tr>
     );
    }
  }
    return (
      <div className="block" id="block_1">
      <div className="lplicensewidget" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>
      <h3>Licensing</h3>
      <div className="lg_widget">
      <table>
      <tbody>
      {contentl}
      <tr>
        <td>{translate('lingoport.lrmversion')}</td>
        <td>{this.props.measure.lrmVersion}</td>
      </tr>
      <tr>
        <td>{translate('lingoport.lrmCompanyName')}</td>
        <td>{this.props.measure.lrmCompanyName}</td>
      </tr>
      <tr>
        <td>{translate('lingoport.lrmProjects')}	</td>
        <td>{this.props.measure.lrmProjects}</td>
      </tr>
      <tr>
        <td>{translate('lingoport.lrmLqaEndDate')}	</td>
        <td>{this.props.measure.lrmLqaEndDate}</td>
      </tr>
         {content}
      <tr>
        <td>{translate('lingoport.gyzrClientVersion')}		</td>
        <td>{this.props.measure.gyzrClientVersion}</td>
      </tr>
      <tr>
        <td>{translate('lingoport.gyzrCompanyName')}	</td>
        <td>{this.props.measure.gyzrCompanyName}</td>
      </tr>
      <tr>
        <td>{translate('lingoport.gyzrProjects')}		</td>
        <td>{this.props.measure.gyzrProjects}</td>
      </tr>
      <tr>
        <td>{translate('lingoport.gyzrProducts')}		</td>
        <td>{this.props.measure.gyzrProducts}</td>
      </tr>
      <tr>
        <td>{translate('lingoport.gyzrRepo')}</td>
        <td>{this.props.measure.gyzrRepo}</td>
      </tr>
      <tr>
        <td>{translate('lingoport.gyzrLines')}	</td>
        <td>{this.props.measure.gyzrLines}</td>
      </tr>
        <br/>
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
}
