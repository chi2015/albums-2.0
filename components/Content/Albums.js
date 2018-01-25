import React from "react";

import Album from "./Album";
import AlbumsButton from '../AlbumsButton';
import Modal from "react-modal";
import glamorous from "glamorous";

const AlbumsBlock = glamorous.div({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'flex-start',
	justifyContent: 'flex-start',
	flexWrap: 'wrap',
	alignContent: 'space-around'
});

export default class Albums extends React.Component {

  constructor() {
	  super();
	  this.state = { delModalOpen : false, id : 0, pass : ""};
	  
  }
  
  openDelModal(id) {
	  this.setState({ delModalOpen : true, id : id});
  }
  
  closeDelModal() {
	  this.setState({ delModalOpen : false});
  }
  
  changePass(e) {
	  this.setState({pass : e.target.value});
  }
  
  deleteAlbum() {
	  this.props.delFunc(this.state.id, this.state.pass);
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
                                                    openDelModal={function() { this.openDelModal(item.id);}.bind(this)}/>);
    
    return (
      <AlbumsBlock>
        {list}
        <Modal isOpen={this.state.delModalOpen} onRequestClose={this.closeDelModal.bind(this)}>Delete {this.state.id}
			Password: <input type="text" onChange={this.changePass.bind(this)} />
			<AlbumsButton onClick={this.deleteAlbum.bind(this)} buttonType="danger">DELETE</AlbumsButton>
        </Modal>
      </AlbumsBlock>
    );
  }
}
