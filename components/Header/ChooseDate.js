import React from "react";

import DateMonth from "../DateMonth";

export default class ChooseDate extends React.Component {

    handleChangeMonth(e) { console.log('val', e.target.value);
    	this.props.changeDate(this.props.year, e.target.value);
    }
    
    handleChangeYear(e) {
    	this.props.changeDate(e.target.value, this.props.month);
    }
    
  render() {
    
    var year_list = [];
    for (var year=2017; year>=2000; year--) year_list.push(<option key={year} value={year}>{year}</option>);
    var month_list = [];
    for (var month=1; month<=12; month++) {
		var month_str = month < 10 ? "0"+month : month;
		month_list.push(<DateMonth key={month} month={month} mode="option"/>);
	}
    
    return (
      <div className="choose-date-block">
      	<select value={this.props.month} onChange={this.handleChangeMonth.bind(this)} name="month">
         {month_list}
        </select>
      	<select value={this.props.year} onChange={this.handleChangeYear.bind(this)} name="year">
         {year_list}
        </select>
      </div>
    );
  }
}
