import React from "react";
import AlbumsButton from '../glamorous/AlbumsButton';
import HeadText from '../glamorous/HeadText';
import glamorous from 'glamorous';

const NoAlbumsBlock = glamorous.div({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	padding:'20px 0'
});

const NoAlbums = ({ add }) => (<NoAlbumsBlock>
        <HeadText>No albums found in chosen date</HeadText>
        <AlbumsButton onClick={add}>Add</AlbumsButton>
      </NoAlbumsBlock>);
      
export default NoAlbums;
