import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Logo.module.css';
import imageLogo from '../../assets/images/logo.png'


const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <NavLink to="/"  exact>
        <img src={imageLogo} alt="GithubStars"/>
      </NavLink>
    </div>
  );
};

export default logo;