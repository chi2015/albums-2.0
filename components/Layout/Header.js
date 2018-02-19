import React from "react";

import ChooseDate from "./ChooseDate";
import Modal from "react-modal";
import DateMonth from "../DateMonth";
import AlbumsButton from '../glamorous/AlbumsButton';
import AddButton from "../glamorous/AddButton";
import glamorous from "glamorous";


const Heading = glamorous.h1({
	fontSize: 20
});

const HeaderBlock = glamorous.div({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	height: 48,
	borderBottom: '#e1e7f2 1px solid'
});

const HeaderTitle = glamorous.div({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
	alignItems: 'center'
});

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
  
  componentWillMount() {
	  Modal.setAppElement('body');
  }
  
  componentWillReceiveProps(nextProps) {
	/*this.setState({ year : nextProps.year, month : nextProps.month }); 
	this.props.albumsStore.month = month;
	  this.props.albumsStore.year = year;*/
  }

  openDateModal() {
	  this.setState({dateModalOpen : true});
  }
  
  closeDateModal() {
    this.setState({dateModalOpen: false}); 
  }
  
  getAlbums() {
  //	this.props.changeDate(this.state.year, this.state.month);
  //	this.props.albumsStore
  	this.props.changeDate();
  	this.closeDateModal();
  }
  
  changeDate(year, month) {
	  console.log(year, month);
	  this.props.albumsStore.month = month;
	  this.props.albumsStore.year = year;
  }
  
  render() {
    return (
      <HeaderBlock>
		<HeaderTitle>
			<Heading>Albums Calendar Catalog</Heading>
			<AddButton onClick={this.props.add}/>
		</HeaderTitle>
		<AlbumsButton buttonType="standard" onClick={this.openDateModal.bind(this)}>
			<DateMonth month={this.props.albumsStore.month}/> {this.props.albumsStore.year}
		</AlbumsButton>
		<Modal isOpen={this.state.dateModalOpen} onRequestClose={this.closeDateModal.bind(this)} style={customStyles}>
			<ChooseDate year={this.props.albumsStore.year} month={this.props.albumsStore.month} changeDate={this.changeDate.bind(this)}/>
			<AlbumsButton onClick={this.getAlbums.bind(this)}>OK</AlbumsButton>
		</Modal>
	  </HeaderBlock>
    );
  }
}
