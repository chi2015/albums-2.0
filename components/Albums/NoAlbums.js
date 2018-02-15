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

export default class NoAlbums extends React.Component {

  render() {
    return (
      <NoAlbumsBlock>
        <HeadText>No albums found in chosen date</HeadText>
        <AlbumsButton onClick={this.props.add}>Add</AlbumsButton>
      </NoAlbumsBlock>
    );
  }
}
