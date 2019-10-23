import React from "react";

import DateMonth from "../DateMonth";
import AlbumsButton from '../glamorous/AlbumsButton';
import glamorous from "glamorous";

import { observer } from "mobx-react";

import { imgUrl } from '../../config';

const AlbumItem = glamorous.div({
	width: 225,
	overflow: 'hidden',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	margin: '30px 20px 30px 0'
});

const AlbumCover = glamorous.div({});

const AlbumCoverImg = glamorous.img({
	width: 220,
	height: 220,
	border: '#e1e7f2 1px solid',
	borderRadius: 10
});

const AlbumInfo = glamorous.div({
	marginTop: 10,
	fontSize: 14
});

const AlbumArtist = glamorous.div({
	color: '#333333',
	fontWeight: 'bold'
});

const AlbumTitle = glamorous.div({
	color: '#333333'
});

const AlbumDate = glamorous.div({
	marginTop: 5,
	color: '#8e8e93'
});

const AlbumCopyright = glamorous.div({
	fontSize: 12,
	color: '#bbbbbb'
});

const Album = observer(({ item }) => (
			<AlbumItem onDoubleClick={item.openEditModal}>
        <AlbumCover><AlbumCoverImg src={imgUrl+item.imgSrc} onError={(e)=>{item.cover = false; e.target.src=imgUrl+"cd1.jpg";}}/></AlbumCover>
        <AlbumInfo>
			<AlbumArtist>{item.artist}</AlbumArtist>
			<AlbumTitle>{item.title}</AlbumTitle>
			<AlbumDate><DateMonth month={item.month}/> {item.year}</AlbumDate>
        </AlbumInfo>
        <ItunesLink link={item.itunes_link}/>
        <AlbumCopyright>{item.copyrightString}</AlbumCopyright>
      </AlbumItem>
));

export default Album;

class ItunesLink extends React.Component {
	viewInItunes() {
	  window.open(this.props.link,'_blank');
	}
	render() {
		if (this.props.link) return <AlbumsButton buttonType="standard" onClick={this.viewInItunes.bind(this)}>View in iTunes</AlbumsButton>;
		else return (null);
	}
}
