import React, { Component } from 'react';

import axios from '../../Axios';

import LoadingBar from '../../components/UI/LoadingBar/LoadingBar';

class Repos extends Component {
  state = {
    username: '',
    repos: [],
    loading: true
  }

  componentDidMount () {
    const username = this.props.match.params.username
    axios.get(`/users/${username}/repos`)
          .then(res => {
            const fetchedRepos =[];
            for (let key in res.data) {
              fetchedRepos.push({...res.data[key],
              id: key
              });
            }
            this.setState({loading: false, repos: fetchedRepos})
          })
          .catch(err => {
            console.log(err)
          });
  }

  render () {
    let fetchedRepos = null;

    if (this.state.loading) {
      fetchedRepos = <LoadingBar />
    } else {
      fetchedRepos = <h2>yoooooooo</h2>
    }
    return (
      <div>
        <h1>This is the repo list</h1>
        {fetchedRepos}
      </div>
    );
  };
};

export default Repos;