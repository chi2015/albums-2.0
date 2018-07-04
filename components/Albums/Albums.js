import React from "react";

import Album from "./Album";
import glamorous from "glamorous";

import { observer } from "mobx-react";

const AlbumsBlock = glamorous.div({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'flex-start',
	justifyContent: 'flex-start',
	flexWrap: 'wrap',
	alignContent: 'space-around'
});


@observer class Albums extends React.Component {  
  render() {
    
    var list = this.props.albumsStore.albums.filter(album => (this.props.albumsStore.year == "0" || album.year == this.props.albumsStore.year) && (this.props.albumsStore.month == "00" || album.month == this.props.albumsStore.month)).map((item) => { item.openEditModal = function() { this.props.openEditModal(item);}.bind(this); return (<Album key={item.id} item={item}/>)});
    
    return (
      <AlbumsBlock>
        {list}
      </AlbumsBlock>
    );
  }
}

export default Albums;
