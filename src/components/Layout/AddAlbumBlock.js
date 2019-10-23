import React from "react";

import HeadText from '../glamorous/HeadText';
import ChooseDate from "./ChooseDate";
import glamorous from 'glamorous';
import AlbumsButton from '../glamorous/AlbumsButton';
import request from 'superagent';
import { serverUrl } from '../../config';
import { imgUrl } from '../../config';
import MediaQueries from "../glamorous/MediaQueries";

const NewAlbumBlock = glamorous.div({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	flexWrap: 'wrap',
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
	textAlign: 'left',
	fontSize: 16,
	[MediaQueries.phone]: {
		fontSize: '2.5vw'
	}

});

const AddAlbumInput = glamorous.input({
	display: 'block',
	margin: '5px 2px 15px',
	width: 170,
	height: 24,
	fontSize: 16,
	[MediaQueries.phone]: {
		fontSize: '2.5vw',
		height: '3.75vw'
	}
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

export default class AddAlbumBlock extends React.Component {
	
	constructor(props) {
		super(props);
		if (props.addModalMode == 'edit') 
		this.state = {
			id : props.editedAlbum.id,
			year: props.editedAlbum.year,
			month: props.editedAlbum.month,
			uploading: false,
			title: props.editedAlbum.title,
			artist: props.editedAlbum.artist,
			itunes_link: props.editedAlbum.itunes_link,
			copyright: props.editedAlbum.copyright,
			cover: props.editedAlbum.cover ? imgUrl + props.editedAlbum.cover : false,
			pass: ''
		}
		
		else this.state = {
			year: props.year,
			month: props.month,
			uploading: false,
			title: '',
			artist: '',
			itunes_link: '',
			copyright: '',
			cover: false,
			pass: ''
		}
	}

	changeNewAlbumDate(year, month) {
		this.setState({ year : year, month : month});
	}
	
	changeArtist(e) {
		this.setState({ artist : e.target.value });
	}
	
	changeTitle(e) {
		this.setState({ title : e.target.value });
	}
	
	changeItunesLink(e) {
		this.setState({ itunes_link : e.target.value });
	}
	
	changeCopyright(e) {
		this.setState({ copyright : e.target.value });
	}

	changePass(e) {
		this.setState({ pass : e.target.value });
	}
	
	browseCover() {
		document.getElementById('cover_file').click();
	}
	
	openCoverFile() {
		let file_input = document.getElementById('cover_file');
		if (file_input.files && file_input.files[0]) {
			let reader = new FileReader();
			reader.onload = function(e) {
				this.setState({ cover : e.target.result });
			}.bind(this);
			
			reader.readAsDataURL(file_input.files[0]);
		}
		else this.setState({ cover : false });
	}
	
	save() { 
		this.setState({ uploading : true });
	    let req = request.post(serverUrl);
	    let file_input = document.getElementById('cover_file');
	    req.field('action', this.props.addModalMode);

	    for (let param in this.state)
		  if (param!="cover" && param!="uploading") req.field(param , this.state[param]);
	      if (file_input.files && file_input.files[0])
		   req.attach("cover", file_input.files[0]);
		  else if (this.props.editedAlbum && this.props.editedAlbum.cover) req.field("cover", this.props.editedAlbum.cover);

		 req.then((res)  => {  console.log("RES", res);
		     this.setState({uploading : false});
		 	 if (res.body && res.body.ok) this.props.okCallback(res.body);
		     if (res.body && res.body.error) this.props.errorCallback(res.body.error, false);
			 if (!res.body) this.props.errorCallback("Unknown Error", false);
		 }).catch((err) => {  console.log("res", err); this.setState({uploading : false}); this.props.errorCallback("Unknown Error", true); });
	}

	delAlbum() {
		if (window.confirm("Delete this album? This action cannot be undo!")) {
			request.post(serverUrl)
	         .send('action=delete')
	         .send('id='+this.state.id)
	         .send('pass='+this.state.pass)
	         .end(function(err, res) { console.log('del res', res);
				if (res.body && res.body.ok) this.props.delCallbackOk(res.body);
				if (res.body && res.body.error) this.props.delCallbackError(res.body.error);
				if (!res.body) this.props.delCallbackError("Unknown error");
			 }.bind(this));
		}
	}
	
	render() {
		return (
		<div>
		<HeadText>{this.props.addModalMode == 'edit' ? 'Edit Album' : 'Add Album'}</HeadText>
			<ChooseDate year={this.state.year} month={this.state.month} changeDate={this.changeNewAlbumDate.bind(this)} mode="add"/>
			<NewAlbumBlock>
				<InputsBlock>
					<InputBlock>Artist: <AddAlbumInput type="text" value={this.state.artist} onChange={this.changeArtist.bind(this)}/></InputBlock>
					<InputBlock>Title: <AddAlbumInput type="text" value={this.state.title} onChange={this.changeTitle.bind(this)}/></InputBlock>
					<InputBlock>iTunes Link: <AddAlbumInput type="text" value={this.state.itunes_link} onChange={this.changeItunesLink.bind(this)}/></InputBlock>
					<InputBlock>Copyright: <AddAlbumInput type="text" value={this.state.copyright} onChange={this.changeCopyright.bind(this)}/></InputBlock>
					<InputBlock>Password: <AddAlbumInput type="text" value={this.state.pass} onChange={this.changePass.bind(this)}/></InputBlock>
				</InputsBlock>
				{this.state.cover ? 
					<AlbumCover onClick={this.browseCover}><AlbumCoverImg src={this.state.cover}/></AlbumCover>
					:
					<AlbumCover onClick={this.browseCover}>
						<AlbumCoverInner><AlbumCoverCenter/></AlbumCoverInner>
						<AlbumCoverTitle>ADD COVER</AlbumCoverTitle>
					</AlbumCover>
					}
				
			</NewAlbumBlock>
			<input name="cover" type="file" accept=".jpg, .png, .jpeg, .gif" style={{visibility : 'hidden', width : '0', height : '0'}} id="cover_file" onChange={this.openCoverFile.bind(this)} />
			{this.state.uploading ? <HeadText>Saving album...</HeadText> : 
				<AlbumsButton onClick={this.save.bind(this)}>{this.props.addModalMode == 'edit' ? 'Save' : 'Add'}</AlbumsButton>}
			{this.props.addModalMode == 'edit' ? <AlbumsButton buttonType="danger" onClick={this.delAlbum.bind(this)}>Delete</AlbumsButton> : ''}
		</div>
		);
    }
}