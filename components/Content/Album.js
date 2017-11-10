import React from "react";

import DateMonth from "../DateMonth";
import Modal from "react-modal";

export default class Album extends React.Component {
  
  imgSrc() {
	  return this.props.cover || "cd1.jpg";
  }
  
  copyrightString() {
	  return this.props.copyright ? "\u2117"+" "+this.props.copyright : "";
	  
  }
  
  render() {
    return (
      <div className="album-item">
        <div className="album-cover" onDoubleClick={this.props.openDelModal}><img src={"img/"+this.imgSrc()} /></div>
        <div className="album-info">
			<div className="album-artist">{this.props.artist}</div>
			<div className="album-title">{this.props.title}</div>
			<div className="album-date"><DateMonth month={this.props.month}/> {this.props.year}</div>
        </div>
        <ItunesLink link={this.props.itunes_link}/>
        <div className="album-copyright">{this.copyrightString()}</div>
      </div>
    );
  }
}

class ItunesLink extends React.Component {
	render() {
		if (this.props.link) return <a href={this.props.link} className="itunes-link albums-btn" target="_blank">View in iTunes</a>;
		else return (null);
	}
}
