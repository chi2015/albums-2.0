import React from "react";

const DateMonth = props => {
	const { month, mode } = props;
	const getMonthStr = () => {
	switch (parseInt(month)) {
			case 0: return mode == "option" ? "All months" : "";
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
};

	const month_strval = parseInt(month) < 10 ? "0"+parseInt(month) : month;
	
	return mode === "option" ? <option value={month_strval}>{getMonthStr()}</option> : <span>{getMonthStr()}</span>
}

export default DateMonth;
