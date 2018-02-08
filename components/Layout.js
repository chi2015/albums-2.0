import React from "react";
import Modal from "react-modal";

import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import AlbumsButton from './AlbumsButton';

import ChooseDate from "./Header/ChooseDate";

import AddAlbumBlock from "./AddAlbumBlock";

import HeadText from './HeadText';

import request from 'superagent';
import glamorous from 'glamorous';

const LayoutBlock = glamorous.div({
	margin: '0 auto',
	maxWidth: 900,
	minHeight: '100%'
});

 const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
	    maxHeight            : '380px',
	    minWidth : '450px',
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

const errorCustomStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
	    maxHeight            : '90px',
		right                 : 'auto',
		bottom                : 'auto',
		textAlign   :          'center',
		display    :             'flex',
		flexDirection :         'column',
		justifyContent : 'space-around',
		alignItems : 'center',
		transform             : 'translate(-50%, -50%)'
	}
}

const server_url = 'http://chi2016.ru/albums/server/albums.php';

export default class Layout extends React.Component {
  constructor() {
  	super();
  	let d = new Date();
  	let year = d.getFullYear() - 1;
  	let month = d.getMonth() + 1;
  	if (month < 10) month = "0"+month;
  	this.state = {
  		year: year,
  		month: month,
  		albums: [],
  		loading : false,
  		uploading : false,
  		addModalOpen : false,
  		errorModalOpen : false,
  		errorText : "",
  		newAlbumAdd : {}
  	}
  }
  
  componentDidMount() {
    this.list();
  }
  
  list() {
	  console.log(this.state.loading);
	  this.setState({ loading : true });
	  request.post(server_url)
	         .send('action=list')
	         .send('year='+this.state.year)
	         .send('month='+this.state.month)
	         .end(function(err, res) { console.log('res', res);
				 if (res.body && res.body.ok && Array.isArray(res.body.albums)) this.setState({ loading: false, albums : res.body.albums});
				 else  this.setState({ loading: false, errorModalOpen : true, errorText : "Error loading albums" });
			 }.bind(this));
  }

  addCallbackOk(res) {
	  this.setState({year : res.year, month : res.month}, function() { this.list(); this.closeAddModal(); }.bind(this));
  }
  
  addCallbackError(error, close) { console.log('error', error);
	  if (close) this.closeAddModal();
	  this.setState({ errorModalOpen : true, errorText : error });
  }
  
  delete_album(id, pass) {
	  console.log('del', id, pass);
	  request.post(server_url)
	         .send('action=delete')
	         .send('id='+id)
	         .send('pass='+pass)
	         .end(function(err, res) { console.log('del res', res);
				if (res.body) {
					if (res.body.ok) this.list();
					else if (res.body.error) this.setState({ errorModalOpen : true, errorText : res.body.error });
					else this.setState({ errorModalOpen : true, errorText : "Unknown error" });
				}
				else this.setState({ errorModalOpen : true, errorText : "Unknown error" }); 
			 }.bind(this));
  }
  
  openAddModal() {
	  this.setState({addModalOpen : true});
  }
  
  closeAddModal() {
	  this.setState({addModalOpen : false});
  }
  
  openErrorModal(text) {
	  this.setState({errorModalOpen : true, errorText : text});
  }
  
  closeErrorModal() {
	  this.setState({errorModalOpen : false});
  }
  
  changeDate(year, month) {
  	this.setState({year : year, month : month}, this.list);
  }
  
  render() {
    return (
      <LayoutBlock>
      	<Header changeDate={this.changeDate.bind(this)} year={this.state.year} month={this.state.month} add={this.openAddModal.bind(this)}/>
      	<Content albums={this.state.albums} add={this.openAddModal.bind(this)} loading={this.state.loading} delFunc={function(id, pass) { this.delete_album(id, pass); }.bind(this)}/>
      	<Footer/>
      	<Modal isOpen={this.state.addModalOpen} onRequestClose={this.closeAddModal.bind(this)} style={customStyles}>
			<AddAlbumBlock year={this.state.year} month={this.state.month} okCallback={this.addCallbackOk.bind(this)} errorCallback={this.addCallbackError.bind(this)}/>
		</Modal>
		<Modal isOpen={this.state.errorModalOpen} onRequestClose={this.closeErrorModal.bind(this)} style={errorCustomStyles}>
			<HeadText>{this.state.errorText}</HeadText>
			<AlbumsButton onClick={this.closeErrorModal.bind(this)}>OK</AlbumsButton>
		</Modal>
      </LayoutBlock>	
    );
  }
}


