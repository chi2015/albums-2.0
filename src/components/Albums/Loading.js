import React from "react";
import HeadText from '../glamorous/HeadText';

export default class Loading extends React.Component {

  render() {
    return (
      <div className="no-albums-block">
        <HeadText>Loading...</HeadText>
      </div>
    );
  }
}
