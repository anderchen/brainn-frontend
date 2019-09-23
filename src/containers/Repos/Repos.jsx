import React, { Component } from 'react';

import axios from '../../Axios';

import Aux from '../../hoc/Aux/Aux';
import LoadingBar from '../../components/UI/LoadingBar/LoadingBar';
import RepoTable from '../../components/RepoTable/RepoTable';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Avatar from '../../components/UI/Avatar/Avatar';
import classes from './Repos.module.css'
class Repos extends Component {
  state = {
    username: '',
    avatarUrl: '',
    repos: [],
    loading: true, 
    showModal: false,
    repo_id: '',
    tags: '',
    id: '',
    filter: ''
  }

  componentDidMount () {
    const username = this.props.match.params.username
    const path = `/users/${username}/repos`
    this.fetchRepos(path)
    this.fetchAvatar(username)
    this.setState({username: username})
  }

  fetchRepos = (path) => {
    axios.get(path)
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

  fetchAvatar = (username) => {
    axios.get(`/users/${username}`)
          .then(res => {
            this.setState({avatarUrl: res.data.avatar_url})
          })
          .catch(err => {
            console.log(err)
          })
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
    const path = `/users/${this.state.username}/repos`
    this.fetchRepos(path)
  }

  onFilterChangeHandler =(event) => {
    console.log(this.state.filter)
    this.setState({filter: event.target.value})
  }

  filterHandler = () => {
    const path = `/users/${this.state.username}/tags/${this.state.filter}`
    this.fetchRepos(path)
  }

  render () {
    let fetchedRepos = null;
    
    this.state.loading ? fetchedRepos = (<LoadingBar />) : fetchedRepos = (<RepoTable repos={this.state.repos} 
                                                                                        clicked={this.editClickedHandler} />)

    let search = null

    if (!this.state.loading) {
      search = (
        <div className={classes.ReposSearch} >
          <form onSubmit={this.filterHandler}>
            <Input value={this.state.filter} changed={this.onFilterChangeHandler} placeholder="Search by Tag" />
          </form>
          <Button btnType="Success" clicked={this.filterHandler}>Search</Button>
        </div>
      )
    }
    return (
      <Aux>
        <Modal show={this.state.showModal} modalClosed={this.closeModalHandler}>
          <form onSubmit={this.updateTagsHandler}>
            <Input value={this.state.tags} changed={this.onChangeTagHandler}/>
          </form>
          <Button btnType="Success" clicked={this.updateTagsHandler}>Update Tags</Button>
        </Modal>
        <div className={classes.ReposSubNavbar}>
          {search}
          <Avatar imageUrl={this.state.avatarUrl}/>
        </div>
        {fetchedRepos}
      </Aux>
    );
  };
};

export default Repos;