import React, { Component } from 'react';

class Repos extends Component {

  componentDidMount () {
    console.log(this.props)
    console.log(this.props.match.params.username)
  }
  render () {
    return (
      <h1>This is the Repo List Page</h1>
    );
  };
};

export default Repos;