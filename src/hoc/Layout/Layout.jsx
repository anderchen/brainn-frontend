import React from 'react';

import Aux from '../Aux/Aux';
import Navbar from '../../components/Navbar/Navbar';
import classes from './Layout.module.css';

const layout = (props) => {
  return (
    <Aux>
      <Navbar />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  );
};

export default layout;