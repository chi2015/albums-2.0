import React from "react";
import AlbumsButton from '../AlbumsButton';
import HeadText from '../HeadText';

export default class NoAlbums extends React.Component {

  render() {
    return (
      <div className="no-albums-block">
        <HeadText>No albums found in chosen date</HeadText>
        <AlbumsButton onClick={this.props.add}>Add</AlbumsButton>
      </div>
    );
  }
}
