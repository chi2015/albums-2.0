import React from "react";

import HeadText from '../glamorous/HeadText';
import ChooseDate from "./ChooseDate";
import glamorous from 'glamorous';
import AlbumsButton from '../glamorous/AlbumsButton';
import superagent from 'superagent';
import request from '../../request';
import { serverUrlNew } from '../../config';
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
		if (props.mode == 'edit') 
		this.state = {
			id : props.album.id,
			year: props.album.year,
			month: props.album.month,
			uploading: false,
			title: props.album.title,
			artist: props.album.artist,
			itunes_link: props.album.itunes_link,
			copyright: props.album.copyright,
			cover: props.album.cover ? imgUrl + props.album.cover : false,
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
		
		let req = superagent.post(serverUrlNew);
	    let file_input = document.getElementById('cover_file');
	    req.field('action', this.props.mode);

	    for (let param in this.state)
		  if (param!="cover" && param!="uploading") req.field(param , this.state[param]);
	      if (file_input.files && file_input.files[0])
		   req.attach("cover", file_input.files[0]);
		  else if (this.props.album && this.props.album.cover) req.field("cover", this.props.album.cover);

		 req.then((res)  => {
		     this.setState({uploading : false});
		 	 if (res.body && res.body.ok) this.props.okCallback(res.body);
		     if (res.body && res.body.error) this.props.errorCallback(res.body.error, false);
			 if (!res.body) this.props.errorCallback("Unknown Error", false);
		 }).catch((err) => { this.setState({uploading : false}); this.props.errorCallback("Unknown Error", true); });
	}

	delAlbum() {
		if (window.confirm("Delete this album? This action cannot be undone!")) {
			const params = {
				action: 'delete',
				id: this.state.id,
				pass: this.state.pass
			};
			request(params).then(data => {
				if (data && data.ok) this.props.okCallback();
				if (data && data.error) this.errorCallback(data.error);
				if (!data) this.props.errorCallback("Unknown error");
			});
		}
	}
	
	render() {
		return (
		<div>
		<HeadText>{this.props.mode == 'edit' ? 'Edit Album' : 'Add Album'}</HeadText>
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
				<AlbumsButton onClick={this.save.bind(this)}>{this.props.mode == 'edit' ? 'Save' : 'Add'}</AlbumsButton>}
			{this.props.mode == 'edit' ? <AlbumsButton buttonType="danger" onClick={this.delAlbum.bind(this)}>Delete</AlbumsButton> : ''}
		</div>
		);
    }
}