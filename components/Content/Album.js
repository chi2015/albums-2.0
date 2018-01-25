import React from "react";

import DateMonth from "../DateMonth";
import AlbumsButton from '../AlbumsButton';
import Modal from "react-modal";
import glamorous from "glamorous";

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

export default class Album extends React.Component {
  
  imgSrc() {
	  return this.props.cover || "cd1.jpg";
  }
  
  copyrightString() {
	  return this.props.copyright ? "\u2117"+" "+this.props.copyright : "";
	  
  }
  
  render() {
    return (
      <AlbumItem>
        <AlbumCover onDoubleClick={this.props.openDelModal}><AlbumCoverImg src={"img/"+this.imgSrc()} /></AlbumCover>
        <AlbumInfo>
			<AlbumArtist>{this.props.artist}</AlbumArtist>
			<AlbumTitle>{this.props.title}</AlbumTitle>
			<AlbumDate><DateMonth month={this.props.month}/> {this.props.year}</AlbumDate>
        </AlbumInfo>
        <ItunesLink link={this.props.itunes_link}/>
        <AlbumCopyright>{this.copyrightString()}</AlbumCopyright>
      </AlbumItem>
    );
  }
}

class ItunesLink extends React.Component {
	viewInItunes() {
	  window.open(this.props.link,'_blank');
	}
	render() {
		if (this.props.link) return <AlbumsButton buttonType="standard" onClick={this.viewInItunes.bind(this)}>View in iTunes</AlbumsButton>;
		else return (null);
	}
}
