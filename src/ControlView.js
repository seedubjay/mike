import React from 'react';
import { Text, Slider, makeStyles } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getThemeProps } from '@material-ui/styles';
import { inheritInnerComments } from '@babel/types';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#F2F2F2",
    height: "100%",
    display: 'flex',
  },
  settingsList: {
    padding: 10,
    overflow: 'auto',
    height: 600,
  },
  outerSettingsBox: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'column',
  },
  innerSettingsBox: {
    backgroundColor: "#FAFAFA",
    width: 'max-width',
    flexGrow: 100,
  },
  slider: {
    paddingLeft: 5,
    paddingRight: 5,
  },
}));

function GraphInput() {

}

function Dataset(props) {
  const classes = useStyles();
  return (
      <ExpansionPanel className={classes.outerSettingsBox} style={{backgroundColor: props.backgroundColor}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>{props.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.innerSettingsBox}>
            <SliderInput></SliderInput>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
  )
}

function SliderInput() {
  const classes = useStyles();
  return (
    <div className={classes.innerSettingsBox}>
      <div className={classes.slider}>
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
          <Dataset backgroundColor="lightgreen" name="Food Prices"/>
          <Dataset backgroundColor="orange" name="Food Availability"/>
          <Dataset backgroundColor="lightblue" name="Rainfall"/>
          <Dataset backgroundColor="red" name="Pasture Availability"/>
      </div>
    </div>
  );
}

export default ControlView;
