import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    width: "100%",
    display: "flex",
    padding: 10,
    alignContent: "center",
    justifyContent: "center",
  }
}));

function RecalculateView({isQuerying, setIsQuerying}) {
    const classes = useStyles();

    return (
      <div class={classes.buttonContainer}>
        <Button variant="contained" onClick={() => handleClick()}>Run Model</Button>
      </div>
    );
}

function handleClick() {
  setIsQuerying(true);
  return;
}
  
export default RecalculateView;