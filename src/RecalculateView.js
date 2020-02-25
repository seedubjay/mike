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

function RecalculateView() {
    const classes = useStyles();

    return (
      <div class={classes.buttonContainer}>
        <Button variant="contained" onClick={() => handleClick()}>Run Model</Button>
      </div>
    );
}

function handleClick() {
  //TODO: link up to backend
  alert("Hello World");
  return;
}
  
export default RecalculateView;