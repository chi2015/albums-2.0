import React from "react";

import Album from "./Album";
import Modal from "react-modal";

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
      <div className="albums-block">
        {list}
        <Modal isOpen={this.state.delModalOpen} onRequestClose={this.closeDelModal.bind(this)}>Delete {this.state.id}
			Password: <input type="text" onChange={this.changePass.bind(this)} />
			<div className="choose-date-button albums-btn" onClick={this.deleteAlbum.bind(this)}>DELETE</div>
        </Modal>
      </div>
    );
  }
}
