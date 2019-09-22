import React from 'react';

import classes from './LoadingBar.module.css'

const loadingBar = () => {
  return (
    <div className={classes.LoadingBar}>
      <span>
        <span></span>
      </span>
    </div>
  );
};

export default loadingBar;