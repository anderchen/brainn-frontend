import React from 'react';

import classes from './Logo.module.css';
import imageLogo from '../../assets/images/logo.png'


const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={imageLogo} alt="GithubStars"/>
    </div>
  );
};

export default logo;