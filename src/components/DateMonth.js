import React from "react";



export default class DateMonth extends React.Component {
  getMonthStr() {
	  switch (parseInt(this.props.month)) {
			case 0: return this.props.mode == "option" ? "All months" : "";
			case 1: return "January";
		  case 2: return "February";
		  case 3: return "March";
		  case 4: return "April";
		  case 5: return "May";
		  case 6: return "June";
		  case 7: return "July";
		  case 8: return "August";
		  case 9: return "September";
		  case 10: return "October";
		  case 11: return "November";
		  case 12: return "December";
	  }
	  
	  return "Month";
	  
  }
  
  render() {
    var month_strval = parseInt(this.props.month) < 10 ? "0"+parseInt(this.props.month) : this.props.month;
    if (this.props.mode == "option") return (<option value={month_strval}>{this.getMonthStr()}</option>);
    else return (<span>{this.getMonthStr()}</span>);
  }
}
