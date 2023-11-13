import React, { useState, useEffect } from "react";
import DateMonth from "../DateMonth";

const ChooseDate = props => {
	const { mode } = props;
	const [year, setYear] = useState(props.year);
	const [month, setMonth] = useState(props.month);
	
	useEffect(() => {
		setYear(props.year)
		setMonth(props.month)
	}, [props.year, props.month]);
	
	const handleChangeMonth = e => {
    	props.changeDate(year, e.target.value);
    };
    
    const handleChangeYear = e => {
    	props.changeDate(e.target.value, month);
    };
    
    const currentYear = new Date().getFullYear();
    
    var year_list = [];
    if (mode == "list") year_list.push(<option key={0} value={0}>All years</option>);
    for (let y=currentYear; y>=2000; y--) year_list.push(<option key={y} value={y}>{y}</option>);
    var month_list = [];
    for (let m= mode == "list" ? 0 : 1; m<=12; m++) {
		month_list.push(<DateMonth key={m} month={m} mode="option"/>);
	}
	
    return (
      <div className="choose-date-block">
      	<select value={month} onChange={handleChangeMonth} name="month">
         {month_list}
        </select>
      	<select value={year} onChange={handleChangeYear} name="year">
         {year_list}
        </select>
      </div>
    );
}

export default ChooseDate;
