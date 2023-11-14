import React, { useState } from "react";

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

const AddAlbumBlock = props => {
	const { mode, album, album: { id } } = props;
	const [year, setYear] = useState(album?.year || props.year);
	const [month, setMonth] = useState(album?.month || props.month);
	const [uploading, setUploading] = useState(false)
	const [title, setTitle] = useState(album?.title || '');
	const [artist, setArtist] = useState(album?.artist || '');
	const [itunes_link, setItunesLink] = useState(album?.itunes_link || '');
	const [copyright, setCopyright] = useState(album?.copyright || '');
	const [cover, setCover] = useState(album?.cover ? imgUrl + album.cover : false);
	const [pass, setPass] = useState('');
	
	const changeNewAlbumDate = (y, m) => {
		setYear(y);
		setMonth(m);
	};
	
	const changeArtist = e => setArtist(e.target.value);
	const changeTitle = e => setTitle(e.target.value);
	const changeItunesLink = e => setItunesLink(e.target.value);
	const changeCopyright = e => setCopyright(e.target.value);
	const changePass = e => setPass(e.target.value);
	const browseCover = () => document.getElementById('cover_file').click();
	const openCoverFile = () => {
		let file_input = document.getElementById('cover_file');
		if (file_input.files && file_input.files[0]) {
			let reader = new FileReader();
			reader.onload = function(e) {
				setCover(e.target.result);
			}
			reader.readAsDataURL(file_input.files[0]);
		}
		else setCover(false);
	};
	const save = () => { 
		setUploading(true);
		let req = superagent.post(serverUrlNew);
	    let file_input = document.getElementById('cover_file');
	    req.field('action', mode);
	    if (mode === 'edit') {
	    	req.field('id', id);
	    }
	    req.field('year', year);
	    req.field('month', month);
	    req.field('title', title);
	    req.field('artist', artist);
	    req.field('itunes_link', itunes_link);
	    req.field('copyright', copyright);
	    req.field('pass', pass);
	    if (file_input.files && file_input.files[0])
		   req.attach("cover", file_input.files[0]);
		else if (album?.cover) req.field("cover", album.cover);
	    
		 req.then((res)  => {
		     setUploading(false);
		 	 if (res.body && res.body.ok) props.okCallback(res.body);
		     if (res.body && res.body.error) props.errorCallback(res.body.error, false);
			 if (!res.body) props.errorCallback("Unknown Error", false);
		 }).catch((err) => { setUploading(false); props.errorCallback("Unknown Error", true); });
	};
	const delAlbum = () => {
		if (window.confirm("Delete this album? This action cannot be undone!")) {
			const params = {
				action: 'delete',
				id,
				pass
			};
			request(params).then(data => {
				if (data && data.ok) props.okCallback();
				if (data && data.error) props.errorCallback(data.error);
				if (!data) props.errorCallback("Unknown error");
			});
		}
	};
	return (
	<div>
		<HeadText>{mode == 'edit' ? 'Edit Album' : 'Add Album'}</HeadText>
			<ChooseDate year={year} month={month} changeDate={changeNewAlbumDate} mode="add"/>
			<NewAlbumBlock>
				<InputsBlock>
					<InputBlock>Artist: <AddAlbumInput type="text" value={artist} onChange={changeArtist}/></InputBlock>
					<InputBlock>Title: <AddAlbumInput type="text" value={title} onChange={changeTitle}/></InputBlock>
					<InputBlock>iTunes Link: <AddAlbumInput type="text" value={itunes_link} onChange={changeItunesLink}/></InputBlock>
					<InputBlock>Copyright: <AddAlbumInput type="text" value={copyright} onChange={changeCopyright}/></InputBlock>
					<InputBlock>Password: <AddAlbumInput type="text" value={pass} onChange={changePass}/></InputBlock>
				</InputsBlock>
				{cover ? 
					<AlbumCover onClick={browseCover}><AlbumCoverImg src={cover}/></AlbumCover>
					:
					<AlbumCover onClick={browseCover}>
						<AlbumCoverInner><AlbumCoverCenter/></AlbumCoverInner>
						<AlbumCoverTitle>ADD COVER</AlbumCoverTitle>
					</AlbumCover>
					}
				
			</NewAlbumBlock>
			<input name="cover" type="file" accept=".jpg, .png, .jpeg, .gif" style={{visibility : 'hidden', width : '0', height : '0'}} id="cover_file" onChange={openCoverFile} />
			{uploading ? <HeadText>Saving album...</HeadText> : 
				<AlbumsButton onClick={save}>{mode == 'edit' ? 'Save' : 'Add'}</AlbumsButton>}
			{mode == 'edit' ? <AlbumsButton buttonType="danger" onClick={delAlbum}>Delete</AlbumsButton> : ''}
		</div>
	
	)
}

export default AddAlbumBlock;
