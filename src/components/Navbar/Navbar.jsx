import React from 'react';

import Logo from '../Logo/Logo';
import classes from './Navbar.module.css';

const navbar = (props) => {
  return(
    <header className={classes.Navbar}>
      <div className={classes.Logo}>
        <Logo/>
      </div>
    </header>
  );
};

export default navbar