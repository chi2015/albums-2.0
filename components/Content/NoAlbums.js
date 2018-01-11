import React from "react";
import AlbumsButton from '../AlbumsButton';

export default class NoAlbums extends React.Component {

  render() {
    return (
      <div className="no-albums-block">
        <h2>No albums found in chosen date</h2>
        <AlbumsButton onClick={this.props.add}>Add</AlbumsButton>
      </div>
    );
  }
}
