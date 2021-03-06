import React from "react";
import Albums from "../Albums/Albums";
import NoAlbums from "../Albums/NoAlbums";
import Loading from "../Albums/Loading";

export default class Content extends React.Component {

  render() {
    if (this.props.loading) return (<div><Loading/></div>);
    return (
      <div>
        {this.props.albumsStore.albumsCount(this.props.albumsStore.year, this.props.albumsStore.month) ? <Albums albumsStore={this.props.albumsStore} openEditModal={this.props.openEditModal} okDelCallback={this.props.okDelCallback} errorDelCallback={this.props.errorDelCallback}/> : <NoAlbums add={this.props.add}/>}
      </div>
    );
  }
}
