import React from "react";
import glamorous from "glamorous";

const AlbumsFooter = glamorous.footer({
	position: 'absolute',
    left: 0,
    bottom: 0,
    height: 20,
    width: '100%',
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: 14,
    color: '#aaaaaa'
});

export default class Footer extends React.Component {

  render() {
    return (
      <AlbumsFooter>Albums. All rights reserved</AlbumsFooter>
    );
  }
}
