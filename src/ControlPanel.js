import React from 'react';
import { Slider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    margin: "auto",
  },
  margin: {
    height: theme.spacing(3),
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
    <div className="ControlPanel">
      <SliderInput className={classes.root}/>
      <SliderInput className={classes.root}/>
      <SliderInput className={classes.root}/>
      <SliderInput className={classes.root}/>
    </div>
  );
}

export default ControlPanel;
