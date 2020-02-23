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

const BAR_WIDTH = 20;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#F2F2F2",
    height: "100%",
    display: 'flex',
  },
  settingsList: {
    padding: 10,
    overflow: 'auto',
    maxHeight: "100%",
  },
  outerSettingsBox: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'column',
  },
  innerSettingsBox: {
    height:190,
    backgroundColor: "#FAFAFA",
    width: 'max-width',
    flexGrow: 100,
  },
  slider: {
    paddingLeft: 1,
    paddingRight: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "60%",
    width:{BAR_WIDTH},
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  label: {
    padding: theme.spacing(1),
    textAlign: "right",
    color: theme.palette.text.secondary,
    height: "5%",
    width:{BAR_WIDTH},
    backgroundColor: 'transparent',
    boxShadow: 'none',
    fontSize:11,
  },
}));


// used as vertical bar graph slider
const BarGraphSlider = withStyles({
  root: {
    color: "currentColor",
    height: 8,
    width: 8,
    // TODO: do something when hovering over the bar graph
    // good with detecting hovering, but can't find a way to change the ui that is graphically appealing
    "&$focusVisible,&:hover":{
      // borderColor:'black',
      // borderRadius:3,
      // backgroundColor:"#000000",
      // color:"#000000",
      // boxShadow: "inherit"
      // border: `1px solid ${theme.palette.divider}`,
    },
  },
  thumb: {
    height: {BAR_WIDTH},
    width: {BAR_WIDTH},
    backgroundColor: "transparent",
    left: 20, // cannot use BAR_WIDTH
    // marginTop: -8,
    // marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    },
    "& .bar": {
      height: 1,
      width: 9,
      backgroundColor:"#fff",
      marginLeft: 1,
      marginRight: 1,
      marginTop:15
    },
  },
  vertical:{
    width:{BAR_WIDTH},
  },
  active: {},
  valueLabel: {},
  track: {
    '$vertical &':{
      width:17,
      // change color to black when hovering
      // TODO: fix this, doesn't work all the time
      "&$focusVisible,&:hover":{
        backgroundColor:"#000000",
      }
    }
  },
  rail: {
    '$vertical &':{
      width:17,
    }
  }
})(Slider);

function SliderThumbComponents(props) {
  return (
    <span {...props}>
      <span className="bar" />
    </span>
  );
}

// creates vertical sliders with labels (e.g. for adjusting rainfall)
function GraphInput(props){
  const classes = useStyles();
  let dataMap = props.dataMap;
  const graphs = [];
  let i = 0;

  dataMap.forEach((datapoint, label)=>{
    if(i>(dataMap.size-6)-1){
      graphs.push(
        <div>
            <Paper className={classes.paper}>
              <BarGraphSlider
                ThumbComponent={SliderThumbComponents}
                orientation="vertical"
                valueLabelDisplay="auto"
                aria-label="bar graph slider"
                defaultValue={datapoint}
                style={{"color":props.color}} //style={{"color":{color}}} doesn't work
              />
            </Paper>
            <Paper className={classes.label}>{label}</Paper>          
          </div>
      )
    }
    else {
      graphs.push(
        <div>
            <Paper className={classes.paper}>
              <BarGraphSlider
                ThumbComponent={SliderThumbComponents}
                orientation="vertical"
                valueLabelDisplay="auto"
                aria-label="bar graph slider"
                defaultValue={datapoint}
                style={{"color":"grey"}} //style={{"color":{color}}} doesn't work
              />
            </Paper>
            <Paper className={classes.label}>{label}</Paper>
          </div>
      )
    }
    i++;
  });


  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid container item xs={12} spacing={0}>
          {graphs}
        </Grid>
      </Grid>
    </div>
  );
}

function Dataset(props) {
  const classes = useStyles();

  // test values for bar graphs
  let dataMap = new Map([
    ["Feb", 10],
    ["Mar", 99],
    ["Apr", 52],
    ["May", 53],
    ["Jun", 58],
    ["Jul", 58],
    ["Aug", 58],
    ["Sep", 58],
    ["Oct", 58],
    ["Nov", 58],
    ["Dec", 58],
    ["Jan", 20],
  ]);

  return (
      <ExpansionPanel className={classes.outerSettingsBox} style={{backgroundColor: props.backgroundColor}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>{props.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.innerSettingsBox}>
            <GraphInput dataMap={dataMap} color={props.backgroundColor}/>
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
