import React from "react";

import Album from "./Album";
import AlbumsButton from '../glamorous/AlbumsButton';
import Modal from "react-modal";
import glamorous from "glamorous";
import request from 'superagent';
import HeadText from '../glamorous/HeadText';
import { serverUrl } from '../../config';

import { observer } from "mobx-react";

const AlbumsBlock = glamorous.div({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'flex-start',
	justifyContent: 'flex-start',
	flexWrap: 'wrap',
	alignContent: 'space-around'
});

const delCustomStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
	    maxHeight            : '190px',
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

@observer class Albums extends React.Component {

  constructor() {
	  super();
	  this.state = { delModalOpen : false, item : false, pass : ""};
	  
  }
  
  componentWillMount() {
	  Modal.setAppElement('body');
  }
  
  openDelModal(item) {
	  this.setState({ delModalOpen : true, item : item});
  }
  
  closeDelModal() {
	  this.setState({ delModalOpen : false});
  }
  
  changePass(e) {
	  this.setState({pass : e.target.value});
  }
  
  deleteAlbum() {
	  this.props.delFunc(this.state.item.id, this.state.pass);
	  this.closeDelModal();
  }
  
  deleteAlbum() {
	  this.closeDelModal();
	  console.log('serverUrl', serverUrl);
	  request.post(serverUrl)
	         .send('action=delete')
	         .send('id='+this.state.item.id)
	         .send('pass='+this.state.item.pass)
	         .end(function(err, res) { console.log('del res', res);
				if (res.body && res.body.ok) this.props.okDelCallback();
				if (res.body && res.body.error) this.props.errorDelCallback(res.body.error);
				if (!res.body) this.errorDelCallback("Unknown error");
			 }.bind(this));
  }
  
  render() {
    
    var list = this.props.albumsStore.albums.filter(album => album.year == this.props.albumsStore.year && album.month == this.props.albumsStore.month).map(item => <Album key={item.id} item={item} openDelModal={function() { this.openDelModal(item);}.bind(this)}/>);
    
    return (
      <AlbumsBlock>
        {list}
        <Modal isOpen={this.state.delModalOpen} onRequestClose={this.closeDelModal.bind(this)} style={delCustomStyles}>
			<HeadText>Delete album "{this.state.item.title}" by {this.state.item.artist}</HeadText>
			<div>Password: <input type="text" onChange={this.changePass.bind(this)} /></div>
			<AlbumsButton onClick={this.deleteAlbum.bind(this)} buttonType="danger">DELETE</AlbumsButton>
        </Modal>
      </AlbumsBlock>
    );
  }
}

export default Albums;
