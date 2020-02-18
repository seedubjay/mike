import React from 'react';
import { Text, Slider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "lightgray",
    height: "100%",
  },
  settingsList: {
    padding: 10,
  },
  settingsBox: {
    backgroundColor: "white",
  },
  slider: {
    width: "100%",
  },
}));

function GraphInput() {

}

function SliderInput() {
  const classes = useStyles();
  return (
    <div className={classes.settingsBox}>
      <div className={classes.slider}>
        <p>
          hello
        </p>
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
    </div>
  )
}

function ControlView() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.settingsList}>
        <SliderInput className={classes.slider}/>
        <SliderInput className={classes.slider}/>
        <SliderInput className={classes.slider}/>
        <SliderInput className={classes.slider}/>
      </div>
    </div>
  );
}

export default ControlView;
