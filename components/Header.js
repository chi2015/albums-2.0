import React from "react";

import ChooseDate from "./Header/ChooseDate";
import Modal from "react-modal";
import DateMonth from "./DateMonth";
import AlbumsButton from './AlbumsButton';

 const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
	    maxHeight            : '70px',
		right                 : 'auto',
		bottom                : 'auto',
		textAlign   :          'center',
		display    :             'flex',
		flexDirection :         'column',
		justifyContent : 'space-around',
		alignItems : 'center',
		transform             : 'translate(-50%, -50%)'
	}
};

export default class Header extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {dateModalOpen : false, year: props.year, month: props.month};
  }
  
  componentWillReceiveProps(nextProps) {
	this.setState({ year : nextProps.year, month : nextProps.month }); 
  }

  openDateModal() {
	  this.setState({dateModalOpen : true});
  }
  
  closeDateModal() {
    this.setState({dateModalOpen: false}); 
  }
  
  getAlbums() {
  	this.props.changeDate(this.state.year, this.state.month);
  	this.closeDateModal();
  }
  
  changeDate(year, month) {
	  this.setState({year: year, month: month});
  }
  
  render() {
    return (
      <header>
		<div className="title">
			<h1>Albums Calendar Catalog</h1>
			<div class="add-btn" onClick={this.props.add}></div>
		</div>
		<AlbumsButton buttonType="standard" onClick={this.openDateModal.bind(this)}>
			<DateMonth month={this.props.month}/> {this.props.year}
		</AlbumsButton>
		<Modal isOpen={this.state.dateModalOpen} onRequestClose={this.closeDateModal.bind(this)} style={customStyles}>
			<ChooseDate year={this.state.year} month={this.state.month} changeDate={this.changeDate.bind(this)}/>
			<AlbumsButton onClick={this.getAlbums.bind(this)}>OK</AlbumsButton>
		</Modal>
	  </header>
    );
  }
}
