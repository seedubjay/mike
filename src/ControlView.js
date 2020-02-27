import React, {useState, useEffect} from 'react';
import { Text, Slider, makeStyles, withStyles } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getThemeProps } from '@material-ui/styles';
import { inheritInnerComments } from '@babel/types';
import SplitPane, { Pane } from 'react-split-pane';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import regionData from './regionData'
import RecalculateView from './RecalculateView';

const BAR_WIDTH = 17;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#F2F2F2",
    height: "100%",
    display: 'flex',
    width: "100%",
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
    height:170,
    backgroundColor: "#FAFAFA",
    width: 'max-width',
    flexGrow: 100,
  },
  slider: {
    paddingLeft: 1,
    paddingRight: 1,
  },
  paper: {
    padding: theme.spacing(0),
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
    fontSize:10,
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
      // TODO: fix this, doesn't work all the time because of the thumb element blocking
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

/**
 * Get the maximum value of a slider bar given the type of feature
 * @param  {String} item    The name of the feature
 * @return {Number}         The maximum value that slider can take
 */
function maxVal(item) {
    if (item === "Temperature") return 50;
    if (item.includes("Fatalities")) return 9999;
    if (item.includes("Maize")) return 30;
    if (item.includes("Rice")) return 60;
    if (item.includes("Sorghum")) return 20;
    return 100;    
}

function BarGraphInput({datapoint, color, label, disabled, name}) {
  const classes = useStyles();

  let [value, setValue] = useState(datapoint);

  return (
    <div>
      <Paper className={classes.label}>
        {value}
      </Paper> 
      <Paper className={classes.paper}>
        <BarGraphSlider
          ThumbComponent={SliderThumbComponents}
          orientation="vertical"
          valueLabelDisplay="auto"
          aria-label="bar graph slider"
          defaultValue={datapoint}
          style={{"color":color}} //style={{"color":{color}}} doesn't work
          onChange={(_,v) => {setValue(v)}}
          disabled={disabled}
          min={0}
          max={maxVal(name)}
          />
      </Paper>
      <Paper className={classes.label}>{label}</Paper> 
    </div>
  );
}

// creates vertical sliders with labels (e.g. for adjusting rainfall)
function GraphInput(props){
  const classes = useStyles();
  let dataMap = props.dataMap;
  const graphs = [];
  let i = 0;

  dataMap.forEach((datapoint, label)=>{
    // only allows the most recent 6 entries to be editable
    if(i>(dataMap.size-6)-1){
      graphs.push(
        <BarGraphInput datapoint={datapoint} color={props.color} label={label} disabled={false} name={props.name}/>
      )
    }
    else {
      graphs.push(
        <BarGraphInput datapoint={datapoint} color="grey" label={label} disabled={true} name={props.name}/> //style={{"color":{color}}} doesn't work
      )
    }
    i++;
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        {/* <Grid container item xs={12} spacing={0}> */}
          {graphs}
        {/* </Grid> */}
      </Grid>
    </div>
  );
}

function includeUnitsInTitle(title){
  if (title === "Temperature") return "Temperature: °C";
  if (title.includes("Maize") || title.includes("Rice") || title.includes("Sorghum")) return title + ": SOS per kg";
  return title;
}

const MONTH_MAP = new Map([
  ["1", "Jan"],
  ["2", "Feb"],
  ["3", "Mar"],
  ["4", "Apr"],
  ["5", "May"],
  ["6", "Jun"],
  ["7", "Jul"],
  ["8", "Aug"],
  ["9", "Sep"],
  ["10", "Oct"],
  ["11", "Nov"],
  ["12", "Dec"],
]);

// TODO: when linking with backend, use this to convert a year and month pair into a graph label
function ConvertYearMonthToGraphLabel(year, month){
  return MONTH_MAP.get(month) + "\'" + year.slice(-2);
}

function Dataset(props) {
  const classes = useStyles();

  return (
      <ExpansionPanel className={classes.outerSettingsBox} style={{backgroundColor: props.backgroundColor}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>{includeUnitsInTitle(props.name)}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.innerSettingsBox}>
            <GraphInput dataMap={props.dataMap} color={props.backgroundColor} name={props.name}/>
            {/* <SliderInput></SliderInput> */}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
  )
}


// THIS ISN'T USED
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

function chooseColor(item) {
    if (item === "Temperature") return "#65c8e6";
    if (item.includes("Fatalities")) return "#F55D5D";
    if (item.includes("Maize")) return "#fadd87";
    if (item.includes("Rice")) return "#85c785";
    if (item.includes("Sorghum")) return "orange";
    return "pink";
}

function getAllControls() {
  var x = [];
  for (var key of Object.keys(regionData)) { 
      x = x.concat(regionData[key]);
  }
  x = x.filter((a,b) => x.indexOf(a) === b);
    
  // test values for bar graphs
  // TODO: Link to back end, such that you can get the data using the x 
  // Examples of x: "Maize (white) - Borama | Awdal - Fatalities due to Conflict | ..."
  let dataMap = new Map([
    [ConvertYearMonthToGraphLabel("2019", "2"), 10],
    ["Mar'19", 99],
    ["Apr'19", 52],
    ["May'19", 53],
    ["Jun'19", 58],
    ["Jul'19", 58],
    ["Aug'19", 58],
    ["Sep'19", 58],
    ["Oct'19", 58],
    ["Nov'19", 58],
    ["Dec'19", 58],
    ["Jan'20", 20],
  ]);

  var dict = {};
  x.forEach(item => dict[item] = <Dataset dataMap={dataMap} backgroundColor={chooseColor(item)} name={item}/>)
  return dict;
}

function ControlList(props) {
  const classes = useStyles();
  
  const allControls = getAllControls();
  
  var list;
  var controls = [];
  if (props.region == "") {
      list = Object.values(allControls);
  } else {
      list = Object.keys(allControls).filter(item => regionData[props.region].includes(item)).map(item => allControls[item]);
  }
      
      return (
        <div className={classes.root}>
          <div className={classes.settingsList}>
          <h3>Data Simulation</h3>
            <p>Adjust the data for the following year to simulate different scenarios and see the impact it has on the famine likelihood.</p>
            {list}
          </div>
        </div>
      );
  }

  function ControlView(props) {
    const classes = useStyles();

    let [data, setData] = useState([]);

    useEffect(() => {
      fetch("http://localhost:5000/data/all", {
        crossDomain: true,
        headers: {'Content-Type':'application/json'}
      })
        .then(res => res.json())
        .then((result) => {
          console.log(result);
          let datasets = []
          Object.keys(result["regions"]).map(region => {
            console.log(result["regions"][region]);
          })
        })
        .catch(console.log);
    }, []);

    return (
      <SplitPane split="horizontal" defaultSize="85%">
        <ControlList region={props.region}/>
        <div class={classes.root}>
          <RecalculateView setIsQuerying={props.setIsQuerying}/>
        </div>
      </SplitPane>
    );
  }
  

export default ControlView;
