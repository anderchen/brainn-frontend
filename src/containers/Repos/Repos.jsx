import React, { Component } from 'react';

import axios from '../../Axios';

import Aux from '../../hoc/Aux/Aux';
import LoadingBar from '../../components/UI/LoadingBar/LoadingBar';
import RepoTable from '../../components/RepoTable/RepoTable';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';

class Repos extends Component {
  state = {
    username: '',
    repos: [],
    loading: true, 
    showModal: false,
    repo_id: '',
    tags: '',
    id: ''
  }

  componentDidMount () {
    const username = this.props.match.params.username
    this.fetchRepos(username)
    this.setState({username: username})
  }

  fetchRepos = (username) => {
    axios.get(`/users/${username}/repos`)
    .then(res => {
      const fetchedRepos =[];
      for (let key in res.data) {
        fetchedRepos.push({...res.data[key]});
      }
      this.setState({loading: false, repos: fetchedRepos})
    })
    .catch(err => {
      console.log(err)
    });
  }

  editClickedHandler = (event) => {
    const repo = this.state.repos.find(repo => repo.repo_id === event.target.value)
    this.setState({showModal: true, 
                    repo_id: event.target.value, 
                    tags: repo.tags.map(e => e.name).join(', '),
                    id: repo.id})

  }

  closeModalHandler = () => {
    this.setState({showModal: false, repo_id: ''})
  }

  onChangeTagHandler = (event) => {
    const newTag = event.target.value
    this.setState({tags: newTag})
  }

  updateTagsHandler = () => {
    const tags = {tags: this.state.tags.split(", ")}
    axios.patch(`/users/${this.state.username}/repos/${this.state.id}`, tags)
          .then(res => {
            this.setState({showModal: false, repo_id: '', tags: '', id: ''})
          })
          .catch(error =>{
            console.log(error)
            this.setState({showModal: false, repo_id: '', tags: '', id: ''})
          });

    this.fetchRepos(this.state.username)
  }


  render () {
    let fetchedRepos = null;
    
    this.state.loading ? fetchedRepos = <LoadingBar /> : fetchedRepos = <RepoTable repos={this.state.repos} 
                                                                                        clicked={this.editClickedHandler} />
    return (
      <Aux>
        <Modal show={this.state.showModal} modalClosed={this.closeModalHandler}>
        <form onSubmit={this.updateTagsHandler}>
          <Input value={this.state.tags} changed={this.onChangeTagHandler}/>
        </form>
          <button onClick={this.updateTagsHandler}>Upddate Tags</button>
        </Modal>
        <h1>This is the repo list</h1>
        {fetchedRepos}
      </Aux>
    );
  };
};

export default Repos;