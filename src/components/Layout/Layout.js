import React from "react";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

import Modal from "react-modal";

import AlbumsButton from '../glamorous/AlbumsButton';
import AddAlbumBlock from "./AddAlbumBlock";
import HeadText from '../glamorous/HeadText';

import glamorous from 'glamorous';
import request from '../../request';

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
	  //  maxHeight            : '500px',
	  //  minWidth : '450px',
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
window.store = albumsStore;

export default class Layout extends React.Component {
  constructor() {
  	super();
  	this.state = {
  		loading : false,
  		uploading : false,
  		addModalOpen : false,
  		errorModalOpen : false,
		  errorText : "",
		  addModalMode : "add",
		  editedAlbum : false
  	}
  }
  
  componentWillMount() {
	  Modal.setAppElement('body');
  }
  
  componentDidMount() {
    this.list();
  }
  
  list() {
	this.setState({ loading: true });
	 if (albumsStore.addedDates[albumsStore.year] && albumsStore.addedDates[albumsStore.year][albumsStore.month]) {
		this.setState({ loading: false }); 
		return;
	}
	const params = {
		action: 'list',
		year: albumsStore.year,
		month: albumsStore.month
	}
	request(params).then(
		data => {
			if (data && data.ok && Array.isArray(data.albums)) {
				albumsStore.addDate(albumsStore.year, albumsStore.month);
				data.albums.forEach(album => { albumsStore.addAlbum(album); });
			} else {
				this.setState({ 
					errorModalOpen : true, 
					errorText : "Error loading albums" 
				});
			}
			this.setState({ loading: false });
		}
	);
  }

  addCallbackOk(res) {
	albumsStore.year = res.year;
	albumsStore.month = res.month;
	delete res['ok'];
	delete res['pass'];
	if (this.state.editedAlbum) albumsStore.editAlbum(res);
	else albumsStore.addAlbum(res);
	this.list();
	this.closeAddModal();
  }
  
  addCallbackError(error, close) {
	  if (close) this.closeAddModal();
	  this.setState({ errorModalOpen : true, errorText : error });
  }
  
  delCallbackOk(res) {
	  albumsStore.deleteAlbum(res.id);
	  this.list();
	  this.closeAddModal();
  }
  
  delCallbackError(error) {
	  this.setState({ errorModalOpen : true, errorText : error });
  }
  
  openAddModal() {
	  this.setState({addModalOpen : true, addModalMode : 'add', editedAlbum : false});
  }

  openEditModal(item) {
	  this.setState({addModalOpen: true, addModalMode : 'edit', editedAlbum : item});
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
  	this.list();
  }
  
  render() {
    return (
      <LayoutBlock>
      	<Header changeDate={this.changeDate.bind(this)} albumsStore={albumsStore} add={this.openAddModal.bind(this)}/>
      	<Content albumsStore={albumsStore} add={this.openAddModal.bind(this)} loading={this.state.loading} openEditModal={this.openEditModal.bind(this)}/>
      	<Footer/>
      	<Modal isOpen={this.state.addModalOpen} onRequestClose={this.closeAddModal.bind(this)} style={customStyles}>
			<AddAlbumBlock year={albumsStore.year} 
						   month={albumsStore.month} 
						   okCallback={this.addCallbackOk.bind(this)} 
						   errorCallback={this.addCallbackError.bind(this)} 
						   delCallbackOk={this.delCallbackOk.bind(this)}
						   delCallbackError={this.delCallbackError.bind(this)}
						   addModalMode={this.state.addModalMode} 
						   editedAlbum={this.state.editedAlbum}/>
		</Modal>
		<Modal isOpen={this.state.errorModalOpen} onRequestClose={this.closeErrorModal.bind(this)} style={errorCustomStyles}>
			<HeadText>{this.state.errorText}</HeadText>
			<AlbumsButton onClick={this.closeErrorModal.bind(this)}>OK</AlbumsButton>
		</Modal>
      </LayoutBlock>	
    );
  }
}


