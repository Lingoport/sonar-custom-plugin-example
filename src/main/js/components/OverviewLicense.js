/*
 * Copyright (C) 2011-2019 Lingoport Inc
 * All rights reserved
 * info AT lingoport DOT com
 */
import React from 'react';
import '../style.css';


export default class OverviewLicense extends React.PureComponent {

  function DateDifference(Date1,Date2) { //Date1和Date2是2017-07-10格式
    var sDate, newDate1, newDate2, Days
    aDate = Date1.split("-");
    newDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); //转换为07-10-2017格式
    aDate = Date2.split("-");
    newDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    Days = parseInt((newDate1 - newDate2) / 1000 / 60 / 60 / 24); //把差的毫秒数转换为天数
    return Days;
}

  render() {
    var gyzrExist = this.props.measure.gyzrExists
    var current = new Date();
    if(gyzrExist===undefined&&this.props.measure.lrmExists===undefined){
      return (
        <div className="block" id="block_1">
        <div className="lplicensewidget" style={{height:'100%'}}>
        <div className="widget">
        <link href="../style.css" rel="stylesheet"/>
        <div className="lg_widget">
        <h5>No data found</h5>
        </div>
        <div className="clear"></div>
        </div>
        <div style={{clear: 'both'}}></div>
        </div>
        </div>

      );
    }else if(gyzrExist===undefined){
    var lrmDate = this.props.measure.lrmEndDate;
    var diff = DateDifference(current,lrmDate);
    var lrm_diff;
    if(Number(diff)>0){
      lrm_diff = (
        <td>LRM License End Date (expired):		</td>
      );
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
        <tr>
          <td>LRM License End Date:		</td>
          {lrm_diff}
          <td>{this.props.measure.lrmEndDate}</td>
        </tr>
        <tr>
          <td>LRM Version:	</td>
          <td>{this.props.measure.lrmVersion}</td>
        </tr>
        <tr>
          <td>LRM License Company Name:</td>
          <td>{this.props.measure.lrmCompanyName}</td>
        </tr>
        <tr>
          <td>LRM Number of Projects Allowed	</td>
          <td>{this.props.measure.lrmProjects}</td>
        </tr>
        <tr>
          <td>InContextQA License End Date:	</td>
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
    return (
      <div className="block" id="block_1">
      <div className="lplicensewidget" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>
      <h3>Licensing</h3>
      <div className="lg_widget">
      <table>
      <tbody>
        <tr>
          <td>GYZR License End Date:		</td>
          <td>{this.props.measure.gyzrEndDate}</td>
        </tr>
        <tr>
          <td>GYZR Client Version:		</td>
          <td>{this.props.measure.gyzrClientVersion}</td>
        </tr>
        <tr>
          <td>GYZR License Company Name:	</td>
          <td>{this.props.measure.gyzrCompanyName}</td>
        </tr>
        <tr>
          <td>GYZR Number of Projects Allowed		</td>
          <td>{this.props.measure.gyzrProjects}</td>
        </tr>
        <tr>
          <td>GYZR Number of Products Allowed		</td>
          <td>{this.props.measure.gyzrProducts}</td>
        </tr>
        <tr>
          <td>GYZR Number of Repo Allowed	</td>
          <td>{this.props.measure.gyzrRepo}</td>
        </tr>
        <tr>
          <td>GYZR Number of Lines Allowed	</td>
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
    return (
      <div className="block" id="block_1">
      <div className="lplicensewidget" style={{height:'100%'}}>
      <div className="widget">
      <link href="../style.css" rel="stylesheet"/>
      <h3>Licensing</h3>
      <div className="lg_widget">
      <table>
      <tbody>
      <tr>
        <td>LRM License End Date:		</td>
        <td>{this.props.measure.lrmEndDate}</td>
      </tr>
      <tr>
        <td>LRM Version:	</td>
        <td>{this.props.measure.lrmVersion}</td>
      </tr>
      <tr>
        <td>LRM License Company Name:</td>
        <td>{this.props.measure.lrmCompanyName}</td>
      </tr>
      <tr>
        <td>LRM Number of Projects Allowed	</td>
        <td>{this.props.measure.lrmProjects}</td>
      </tr>
      <tr>
        <td>InContextQA License End Date:	</td>
        <td>{this.props.measure.lrmLqaEndDate}</td>
      </tr>
      <tr>
        <td>GYZR License End Date:		</td>
        <td>{this.props.measure.gyzrEndDate}</td>
      </tr>
      <tr>
        <td>GYZR Client Version:		</td>
        <td>{this.props.measure.gyzrClientVersion}</td>
      </tr>
      <tr>
        <td>GYZR License Company Name:	</td>
        <td>{this.props.measure.gyzrCompanyName}</td>
      </tr>
      <tr>
        <td>GYZR Number of Projects Allowed		</td>
        <td>{this.props.measure.gyzrProjects}</td>
      </tr>
      <tr>
        <td>GYZR Number of Products Allowed		</td>
        <td>{this.props.measure.gyzrProducts}</td>
      </tr>
      <tr>
        <td>GYZR Number of Repo Allowed	</td>
        <td>{this.props.measure.gyzrRepo}</td>
      </tr>
      <tr>
        <td>GYZR Number of Lines Allowed	</td>
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
