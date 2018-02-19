import React from "react";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

import Modal from "react-modal";

import AlbumsButton from '../glamorous/AlbumsButton';
import AddAlbumBlock from "./AddAlbumBlock";
import HeadText from '../glamorous/HeadText';

import request from 'superagent';
import glamorous from 'glamorous';

import { serverUrl } from '../../config';

import AlbumsListModel from "../../models/AlbumsList.js";

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

let d = new Date();
let year = d.getFullYear() - 1;
let month = d.getMonth() + 1;
if (month < 10) month = "0"+month;

const albumsStore = new AlbumsListModel(year, month);

export default class Layout extends React.Component {
  constructor() {
  	super();
  	this.state = {
  		loading : false,
  		uploading : false,
  		addModalOpen : false,
  		errorModalOpen : false,
  		errorText : ""
  	}
  }
  
  componentWillMount() {
	  Modal.setAppElement('body');
  }
  
  componentDidMount() {
    this.list();
  }
  
  list() {
	  if (albumsStore.addedDates[albumsStore.year] && albumsStore.addedDates[albumsStore.year][albumsStore.month]) return;
	  
	  this.setState({ loading : true });
	  request.post(serverUrl)
	         .send('action=list')
	         .send('year='+albumsStore.year)
	         .send('month='+albumsStore.month)
	         .end(function(err, res) { console.log('res', res);
				 if (res.body && res.body.ok && Array.isArray(res.body.albums)) {
					 if (!albumsStore.addedDates[albumsStore.year]) albumsStore.addedDates[albumsStore.year] = {};
					 albumsStore.addedDates[albumsStore.year][albumsStore.month] = true;
					 res.body.albums.forEach(function(album) {
						 console.log('album', album);
						 albumsStore.addAlbum(album);
					 });
				 }
				 else this.setState({ errorModalOpen : true, errorText : "Error loading albums" });
				 
				 this.setState({ loading: false});
			 }.bind(this));
  }

  addCallbackOk(res) {
	  this.setState({year : res.year, month : res.month}, function() { this.list(); this.closeAddModal(); }.bind(this));
  }
  
  addCallbackError(error, close) { console.log('error', error);
	  if (close) this.closeAddModal();
	  this.setState({ errorModalOpen : true, errorText : error });
  }
  
  delCallbackOk() {
	  this.list();
  }
  
  delCallbackError(error) {
	  this.setState({ errorModalOpen : true, errorText : error });
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
  
  changeDate() {
  	//this.setState({year : year, month : month}, this.list);
  	//albumsStore.year = year;
  	//albumsStore.month = month;
  	this.list();
  }
  
  render() {
    return (
      <LayoutBlock>
      	<Header changeDate={this.changeDate.bind(this)} albumsStore={albumsStore} add={this.openAddModal.bind(this)}/>
      	<Content albumsStore={albumsStore} add={this.openAddModal.bind(this)} loading={this.state.loading} okDelCallback={this.delCallbackOk.bind(this)} errorDelCallback={this.delCallbackError.bind(this)}/>
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


