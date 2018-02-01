import React from "react";
import Modal from "react-modal";

import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import AlbumsButton from './AlbumsButton';

import ChooseDate from "./Header/ChooseDate";

import HeadText from './HeadText';

import request from 'superagent';
import glamorous from 'glamorous';
//next to watch https://www.youtube.com/watch?v=qh3dYM6Keuw (react 4)
//next to watch https://www.youtube.com/watch?v=_D1JGNidMr4 (react 5)
//TODO: setState by timeout, bind state to props

const LayoutBlock = glamorous.div({
	margin: '0 auto',
	maxWidth: 900,
	minHeight: '100%'
});

const NewAlbumBlock = glamorous.div({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center'
});

const InputsBlock = glamorous.div({
	width: 200,
	textAlign: 'center',
	margin: '20px 0',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'flex-start'
});

const InputBlock = glamorous.div({
	textAlign: 'left'
});

const AddAlbumInput = glamorous.input({
	display: 'block',
	margin: '5px 0 15px',
	width: 170,
	height: 24,
	fontSize: 16
});

const AlbumCover = glamorous.div({
	width: 200,
	height: 200,
	backgroundColor: '#c9c9c3',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	position: 'relative',
	cursor: 'pointer'
});

const AlbumCoverInner = glamorous.div({
	width: '80%',
	height: '80%',
	borderRadius: '50%',
	border: '5px white solid',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center'
});

const AlbumCoverCenter = glamorous.div({
	width: '5%',
	height: '5%',
	borderRadius: '50%',
	border: '25px white solid'
});

const AlbumCoverTitle = glamorous.div({
	position: 'absolute',
	top: '50%',
	left : '50%',
	transform: 'translate(-50%, -50%)',
	color: 'grey',
	opacity: 0.5,
	fontSize: '30px'
});

const AlbumCoverImg = glamorous.img({
	width: '100%',
	height: '100%'
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
  	
  	//setTimeout(function() { this.setState({year : "2017", month : "10"}); }.bind(this), 3000);
  	
  	this.resetNewAlbum();
  }
  
  componentDidMount() {
    this.list();
  }
  
  resetNewAlbum() {
  	let y = this.state.year;
  	let m = this.state.month;
  	
  	this.state.newAlbumAdd = 
  		{
  			year : y,
  			month : m,
  			title : '',
  			artist : '',
  			itunes_link : '',
  			copyright : '',
  			cover : false
  		};
  }
  
  changeParam(param, value) {
  	 this.state.newAlbumAdd[param] = value;
  }
  
  changeArtist(e) {
  	this.changeParam('artist', e.target.value);
  }
  
  changeTitle(e) {
  		this.changeParam('title', e.target.value);
  }
  
  changeITunesLink(e) {
  		this.changeParam('itunes_link', e.target.value);
  }
  
  changeCopyright(e) {
  		this.changeParam('copyright', e.target.value);
  }
  
  changeNewAlbumDate(year, month) {
	  let new_album_add = this.state.newAlbumAdd;
	  new_album_add.year = year;
	  new_album_add.month = month;
	  this.setState({ newAlbumAdd : new_album_add });
  }
  
  list() {
	  console.log(this.state.loading);
	  this.setState({ loading : true });
	  this.resetNewAlbum(); 
	  request.post(server_url)
	         .send('action=list')
	         .send('year='+this.state.year)
	         .send('month='+this.state.month)
	         .end(function(err, res) { console.log('res', res);
				 if (res.body && res.body.ok && Array.isArray(res.body.albums)) this.setState({ loading: false, albums : res.body.albums});
				 else  this.setState({ loading: false, errorModalOpen : true, errorText : "Error loading albums" });
			 }.bind(this));
  }
  
  add() {
	 console.log('add' ,this.state);
	 this.setState({ uploading : true });
	 let req = request.post(server_url);
	 let file_input = document.getElementById('cover_file');
	 req.field('action','add');
	 for (let param in this.state.newAlbumAdd)
		if (param!="cover") req.field(param , this.state.newAlbumAdd[param]);
	 if (file_input.files && file_input.files[0])
		req.attach("cover", file_input.files[0]);

	 req.then((res)  => {  
		 if (res.body) {
			 if (res.body.ok) this.setState({year : res.body.year, month : res.body.month}, function() { this.list(); this.closeAddModal(); 
				}.bind(this));
			 if (res.body.error) { this.setState({ errorModalOpen : true, errorText : res.body.error }); }
		 }
		 else {  this.setState({ errorModalOpen : true, errorText : "Unknown error" }); }
		 
		 this.setState({uploading : false});
		
	 }).catch((err) => {  this.closeAddModal(); this.setState({ uploading : false, errorModalOpen : true, errorText : "Unknown error" }); });
	 
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
	  this.resetNewAlbum();
  }
  
  openErrorModal(text) {
	  this.setState({errorModalOpen : true, errorText : text});
  }
  
  closeErrorModal() {
	  this.setState({errorModalOpen : false});
  }
  
  changeDate(year, month) {
  	console.log('year', year, 'month', month);
  	this.setState({year : year, month : month}, this.list);
  }
  
  browseCover() {
	  document.getElementById('cover_file').click();
  }
  
  openCoverFile() {
	let file_input = document.getElementById('cover_file');
	let new_album_add = this.state.newAlbumAdd;
	  
	  console.log('state', this.state);
	if (file_input.files && file_input.files[0]) {
		let reader = new FileReader();
		reader.onload = function(e) {
			new_album_add.cover = e.target.result;
			this.setState({ newAlbumAdd : new_album_add });
		}.bind(this);
		
		reader.readAsDataURL(file_input.files[0]);
	}
	else { new_album_add.cover = false;

		  this.setState({ newAlbumAdd : new_album_add });
	}
  }
  
  render() {

    return (
      <LayoutBlock>
      	<Header changeDate={this.changeDate.bind(this)} year={this.state.year} month={this.state.month} add={this.openAddModal.bind(this)}/>
      	<Content albums={this.state.albums} add={this.openAddModal.bind(this)} loading={this.state.loading} delFunc={function(id, pass) { this.delete_album(id, pass); }.bind(this)}/>
      	<Footer/>
      	<Modal isOpen={this.state.addModalOpen} onRequestClose={this.closeAddModal.bind(this)} style={customStyles}>
			<HeadText>Add Album</HeadText>
			<ChooseDate year={this.state.newAlbumAdd.year} month={this.state.newAlbumAdd.month} changeDate={this.changeNewAlbumDate.bind(this)}/>
			<NewAlbumBlock>
				<InputsBlock>
					<InputBlock>Artist: <AddAlbumInput type="text" onChange={this.changeArtist.bind(this)} /></InputBlock>
					<InputBlock>Title: <AddAlbumInput type="text" onChange={this.changeTitle.bind(this)} /></InputBlock>
					<InputBlock>iTunes Link: <AddAlbumInput type="text" onChange={this.changeITunesLink.bind(this)} /></InputBlock>
					<InputBlock>Copyright: <AddAlbumInput type="text" onChange={this.changeCopyright.bind(this)} /></InputBlock>
				</InputsBlock>
				{this.state.newAlbumAdd.cover ? 
					<AlbumCover onClick={this.browseCover}><AlbumCoverImg src={this.state.newAlbumAdd.cover}/></AlbumCover>
					:
					<AlbumCover onClick={this.browseCover}>
						<AlbumCoverInner><AlbumCoverCenter/></AlbumCoverInner>
						<AlbumCoverTitle>ADD COVER</AlbumCoverTitle>
					</AlbumCover>
					}
				
			</NewAlbumBlock>
			<input name="cover" type="file" accept=".jpg, .png, .jpeg, .gif" style={{visibility : 'hidden', width : '0', height : '0'}} id="cover_file" onChange={this.openCoverFile.bind(this)} />
			{this.state.uploading ? <HeadText>Uploading new album...</HeadText> : 
				<AlbumsButton onClick={this.add.bind(this)}>Add</AlbumsButton>}
		</Modal>
		<Modal isOpen={this.state.errorModalOpen} onRequestClose={this.closeErrorModal.bind(this)} style={errorCustomStyles}>
			<HeadText>{this.state.errorText}</HeadText>
			<AlbumsButton onClick={this.closeErrorModal.bind(this)}>OK</AlbumsButton>
		</Modal>
      </LayoutBlock>	
    );
  }
}


