import React, { Component} from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Home.module.css';

class Home extends Component {
  state = {
    value: ''
  }
  
  handleChange = (event) => {
    const updatedValue = event.target.value;
    this.setState({value: updatedValue});
  }

  handleSubmit = (event) => {   
    event.preventDefault();
    this.props.history.push(`/repos/${this.state.value}`)
  }

  render () {
    return (
      <div className={classes.FormWrapper}>
        <div className={classes.Form}>
          <p>
            https://github.com/
          </p>
          <form onSubmit={this.handleSubmit}>
            <Input placeholder="Type your username" value={this.state.value} changed={this.handleChange}/>
          </form>
        </div>
        <Button btnType="Success" clicked={this.handleSubmit}>Get Repositories!</Button>
      </div>
    );
  }
};

export default Home;  