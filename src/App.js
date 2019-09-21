import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Repos from './containers/Repos/Repos';
class App extends Component {
  render () {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/repos/:username" component={Repos}/>
            <Route path="/" exact component={Home}/>
          </Switch>
        </Layout>
      </div>
    );
  };
}

export default App;
