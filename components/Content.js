import React from "react";
import Albums from "./Content/Albums";
import NoAlbums from "./Content/NoAlbums";
import Loading from "./Content/Loading";

export default class Content extends React.Component {

  render() {
    if (this.props.loading) return (<div><Loading/></div>);
    return (
      <div>
        {this.props.albums.length ? <Albums list={this.props.albums} okDelCallback={this.props.okDelCallback} errorDelCallback={this.props.errorDelCallback}/> : <NoAlbums add={this.props.add}/>}
      </div>
    );
  }
}
