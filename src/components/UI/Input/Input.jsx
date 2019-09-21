import React from 'react';

import classes from './Input.module.css'

const input = (props) => {
  return (
    <div className={classes.Input}>
      <input className={classes.InputElement} 
              type="text" 
              placeholder={props.placeholder} 
              value={props.value} />
    </div>
  );
};

export default input;