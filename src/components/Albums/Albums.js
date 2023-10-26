import React from "react";

import Album from "./Album";
import glamorous from "glamorous";

const AlbumsBlock = glamorous.div({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'flex-start',
	justifyContent: 'center',
	flexWrap: 'wrap',
	alignContent: 'space-around'
});

const Albums = ({ albums, openEditModal }) => albums.map(album => <Album key={album.id} item={album} openEditModal={() => openEditModal(album)} />)

export default Albums;
