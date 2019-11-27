import React from "react";
import DateMonth from "../DateMonth";

export default class ChooseDate extends React.Component {

	constructor(props) {
		super(props);
		this.state = { year : props.year, month : props.month, mode : props.mode };
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({ year : nextProps.year, month : nextProps.month });
	}

    handleChangeMonth(e) {
    	this.props.changeDate(this.props.year, e.target.value);
    }
    
    handleChangeYear(e) {
    	this.props.changeDate(e.target.value, this.props.month);
    }
    
  render() {
    const currentYear = new Date().getFullYear();
    var year_list = [];
    if (this.state.mode == "list") year_list.push(<option key={0} value={0}>All years</option>);
    for (var year=currentYear; year>=2000; year--) year_list.push(<option key={year} value={year}>{year}</option>);
    var month_list = [];
    for (var month=this.state.mode == "list" ? 0 : 1; month<=12; month++) {
		var month_str = month < 10 ? "0"+month : month;
		month_list.push(<DateMonth key={month} month={month} mode="option"/>);
	}
    
    return (
      <div className="choose-date-block">
      	<select value={this.state.month} onChange={this.handleChangeMonth.bind(this)} name="month">
         {month_list}
        </select>
      	<select value={this.state.year} onChange={this.handleChangeYear.bind(this)} name="year">
         {year_list}
        </select>
      </div>
    );
  }
}
