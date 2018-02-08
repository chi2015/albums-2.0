import React from "react";

import Album from "./Album";
import AlbumsButton from '../AlbumsButton';
import Modal from "react-modal";
import glamorous from "glamorous";
import HeadText from '../HeadText';

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

export default class Albums extends React.Component {

  constructor() {
	  super();
	  this.state = { delModalOpen : false, item : false, pass : ""};
	  
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
  
  render() {
    
    var list = this.props.list.map((item) => <Album key={item.id} 
                                                    artist={item.artist} 
                                                    title={item.title} 
                                                    year={item.year} 
                                                    month={item.month} 
                                                    cover={item.cover}
                                                    copyright={item.copyright}
                                                    itunes_link={item.itunes_link}
                                                    openDelModal={function() { this.openDelModal(item);}.bind(this)}/>);
    
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
