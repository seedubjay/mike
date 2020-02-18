import React from 'react';
import { Slider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white",
  },
  slider: {
    width: 300,
    margin: "auto",
  },
}));

function GraphInput() {

}

function SliderInput({className}) {
  return (
    <div className={className}>
      <Slider
        defaultValue={30}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={110}
      />
    </div>
  )
}

function ControlPanel() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SliderInput className={classes.slider}/>
      <SliderInput className={classes.slider}/>
      <SliderInput className={classes.slider}/>
      <SliderInput className={classes.slider}/>
    </div>
  );
}

export default ControlPanel;
