import React from 'react';
import { Text, Slider, makeStyles, withStyles } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getThemeProps } from '@material-ui/styles';
import { inheritInnerComments } from '@babel/types';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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

// used as vertical slider
const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
    width: 8
  },
  thumb: {
    height: 12,
    width: 12,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    },
    left: 13 //"calc(45%)"
  },
  active: {},
  valueLabel: {
    left: "calc(-150%)" //"calc(-50% + 4px)"
  },
  track: {
    height: 80,
    width: 50,
    borderRadius: 40
  },
  rail: {
    height: 80,
    width: 50,
    borderRadius: 40
  }
})(Slider);

// style for the vertical sliders
const useBarGraphStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "120%",
    width:"100/6%",
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  label: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "50%",
    width:"100/6%",
    backgroundColor: 'transparent',
    boxShadow: 'none'
  }
}));

// creates vertical sliders with labels (e.g. for adjusting rainfall)
function GraphInput() {
  const classes = useBarGraphStyles();

  // creates a row of vertical sliders
  function VerticalSliders() {
    const sliders = [];
    for(let i=0; i<6; i++){
      sliders.push(<Grid item xs={2}>
        <Paper className={classes.paper}>
          <PrettoSlider
            orientation="vertical"
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={20}
          />
        </Paper>
      </Grid>)
    }
    
    return (
      <React.Fragment>
        {sliders}
      </React.Fragment>
    );
  }

  // create row of labels for the vertical sliders
  function VerticalSliderLabels() {
    return (
      <React.Fragment>
        <Grid item xs={2}>
          <Paper className={classes.label}>Jan</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.label}>Feb</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.label}>Mar</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.label}>Apr</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.label}>May</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.label}>Jun</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={0}>
          <VerticalSliders />
        </Grid>
        <Grid container item xs={12} spacing={0}>
          <VerticalSliderLabels />
        </Grid>
      </Grid>
    </div>
  );
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
            <GraphInput></GraphInput>
            {/* <SliderInput></SliderInput> */}
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

function ControlViewForRegion(props) {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <div className={classes.settingsList}>
            <Dataset backgroundColor="lightgreen" name={props.region+" - Price of AAAAA"}/>
            <Dataset backgroundColor="orange" name={props.region+" - Price of BBBBB"}/>
            <Dataset backgroundColor="lightblue" name={props.region+" - Price of CCCCC"}/>
            <Dataset backgroundColor="yellow" name={props.region+" - Price of DDDDD"}/>
            <Dataset backgroundColor="red" name={props.region+" - Fatalities"}/>

        </div>
      </div>
    );
    
}

function ControlView(props) {
  const classes = useStyles();
  if (props.region == "Somalia") {
      return (
        <div className={classes.root}>
          <div className={classes.settingsList}>
              <Dataset backgroundColor="lightgreen" name="Food Prices"/>
              <Dataset backgroundColor="orange" name="Food Availability"/>
              <Dataset backgroundColor="lightblue" name="Rainfall"/>
              <Dataset backgroundColor="red" name="Pasture Availability"/>          
              <Dataset backgroundColor="red" name="Pasture Availability"/>
              <Dataset backgroundColor="red" name="Pasture Availability"/>

          </div>
        </div>
      );
  } else {
      return ControlViewForRegion(props);
  }
  
}

export default ControlView;
