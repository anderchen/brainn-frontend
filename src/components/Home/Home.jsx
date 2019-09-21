import React from 'react';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import classes from './Home.module.css';

const home = (props) => {
  return (
    <div className={classes.FormWrapper}>
      <div className={classes.Form}>
        <p>
          https://github.com/
        </p>
        <form >
          <Input placeholder="Type your username" />
        </form>
      </div>
      <Button btnType="Success">Get Repositories!</Button>
    </div>
  );
};

export default home;