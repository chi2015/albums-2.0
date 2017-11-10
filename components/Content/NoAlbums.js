import React from "react";

export default class NoAlbums extends React.Component {

  render() {
    return (
      <div className="no-albums-block">
        <h2>No albums found in chosen date</h2>
        <div class="albums-btn add-album-btn" onClick={this.props.add}>Add</div>
      </div>
    );
  }
}
