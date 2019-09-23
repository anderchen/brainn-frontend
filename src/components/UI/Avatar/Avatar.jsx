import React from 'react';

import classes from './Avatar.module.css';

const avatar = (props) => {
  return (
    <img className={classes.AvatarLarge} alt="avatar" src={props.imageUrl} />
  );
};

export default avatar