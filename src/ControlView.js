import React, { useState, useEffect } from 'react';
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
    height: 170,
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
    width: { BAR_WIDTH },
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  label: {
    padding: theme.spacing(1),
    textAlign: "right",
    color: theme.palette.text.secondary,
    height: "5%",
    width: { BAR_WIDTH },
    backgroundColor: 'transparent',
    boxShadow: 'none',
    fontSize: 10,
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
    "&$focusVisible,&:hover": {
      // borderColor:'black',
      // borderRadius:3,
      // backgroundColor:"#000000",
      // color:"#000000",
      // boxShadow: "inherit"
      // border: `1px solid ${theme.palette.divider}`,
    },
  },
  thumb: {
    height: { BAR_WIDTH },
    width: { BAR_WIDTH },
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
      backgroundColor: "#fff",
      marginLeft: 1,
      marginRight: 1,
      marginTop: 15
    },
  },
  vertical: {
    width: { BAR_WIDTH },
  },
  active: {},
  valueLabel: {},
  track: {
    '$vertical &': {
      width: 17,
      // change color to black when hovering
      // TODO: fix this, doesn't work all the time because of the thumb element blocking
      "&$focusVisible,&:hover": {
        backgroundColor: "#000000",
      }
    }
  },
  rail: {
    '$vertical &': {
      width: 17,
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

function BarGraphInput({ datapoint, color, label, disabled, name, cb }) {
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
          style={{ "color": color }} //style={{"color":{color}}} doesn't work
          onChange={(_, v) => { setValue(v); cb(v); }}
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
function GraphInput(props) {
  const classes = useStyles();
  let data = props.data;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        {/* <Grid container item xs={12} spacing={0}> */}
        {data.map((x,i) => (
          // only allows the most recent 6 entries to be editable
          <BarGraphInput
            key={i}
            datapoint={Math.round(x.value)}
            color={i > (data.length - 6) - 1 ? props.color : "grey"}
            label={x.label}
            disabled={i <= (data.length - 6) - 1}
            name={props.name} cb={x.cb} />
        ))}
        {/* </Grid> */}
      </Grid>
    </div>
  );
}

function includeUnitsInTitle(title) {
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
function ConvertYearMonthToGraphLabel(year, month) {
  return MONTH_MAP.get(month) + "\'" + year.slice(-2);
}

function Dataset(props) {
  const classes = useStyles();

  return (
    <ExpansionPanel className={classes.outerSettingsBox} style={{ backgroundColor: props.backgroundColor }}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={classes.heading}>{includeUnitsInTitle(props.name)}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={classes.innerSettingsBox}>
          <GraphInput data={props.data} color={props.backgroundColor} name={props.name} />
          {/* <SliderInput></SliderInput> */}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
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

function ControlList({data, visible}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.settingsList}>
        <h3>Data Simulation</h3>
        <p>Adjust the data for the following year to simulate different scenarios and see the impact it has on the famine likelihood.</p>
        {Object.keys(data).filter(k => visible.includes(k)).map((k,i) => (
          <Dataset
            key={i}
            data={data[k]}
            backgroundColor={chooseColor(k)}
            name={k} />
        ))}
      </div>
    </div>
  );
}

function ControlView({region, setIsQuerying}) {
  const classes = useStyles();

  let [data, setData] = useState({});

  let [regionFactors, setRegionFactors] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/data/all", {
      crossDomain: true,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);

        let datasets = {}
        let rf = {}
        Object.keys(result["regions"]).filter(region => result["regions"][region].fitted).map(region => {
          let df = result["regions"][region]
          rf[region] = df.historical_data._feature_names
          df.historical_data._feature_names.filter(name => !(name in datasets)).map(name => {
            datasets[name] = []
            let date_column = df.historical_data[name].columns.findIndex(x => x === "Date");
            let year_column = df.historical_data[name].columns.findIndex(x => x === "Year");
            let month_column = df.historical_data[name].columns.findIndex(x => x === "Month");
            var value_column = df.historical_data[name].columns.findIndex(x => x === "Temperature");
            if (value_column === -1) {
              value_column = df.historical_data[name].columns.findIndex(x => x === "Fatalities");
            }
            if (value_column === -1) {
              value_column = df.historical_data[name].columns.findIndex(x => x === "Price");
            }
            let lastData = df.historical_data[name].rows.map(row => row[date_column]).reduce((a,b) => Math.max(a,b));
            console.log(df.historical_data[name].rows.map(row => row[date_column]));
            console.log(lastData);
            
            let recent = df.historical_data[name].rows.sort((a, b) => a[date_column] - b[date_column]).slice(-6);
            let next = df.predicted_data[name].rows.filter(row => row[date_column] > lastData).sort((a, b) => a[date_column] - b[date_column]).slice(0,6);
            recent.map(row => {
              datasets[name].push({
                label: ConvertYearMonthToGraphLabel(row[year_column].toString(), row[month_column].toString()),
                value: row[value_column],
              });
            });
            next.map(row => {
              datasets[name].push({
                label: ConvertYearMonthToGraphLabel(row[year_column].toString(), row[month_column].toString()),
                value: row[value_column],
                cb: (v) => {console.log(`${name} ${row[year_column]} ${row[month_column]} ${v}`)},
              });
            });
          })
        })

        setRegionFactors(rf);
        setData(datasets);

        console.log(datasets);
      })
      .catch(console.log);
  }, []);

  console.log(regionFactors);
  return (
    <SplitPane split="horizontal" defaultSize="85%">
      <ControlList data={data} visible={region === "" ? Object.keys(data) : (region in regionFactors ? regionFactors[region] : [])}/>
      <div class={classes.root}>
        <RecalculateView setIsQuerying={setIsQuerying} />
      </div>
    </SplitPane>
  );
}


export default ControlView;
