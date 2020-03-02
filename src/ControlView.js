import React, { useState, useEffect } from 'react';
import { Slider, makeStyles, withStyles, CircularProgress } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SplitPane from 'react-split-pane';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import RecalculateView from './RecalculateView';
import { API_ENDPOINT } from './config';

const BAR_WIDTH = 17;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#F2F2F2",
    height: "100%",
    display: 'flex',
    width: "100%",
  },
  centeredBox: {
    textAlign: "center",
    margin: "auto",
    padding: 20,
  },
  settingsList: {
    padding: 10,
    overflow: 'auto',
    maxHeight: "100%",
  },
  info: {
    margin: 10,
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
  },
  thumb: {
    height: { BAR_WIDTH },
    width: { BAR_WIDTH },
    backgroundColor: "transparent",
    left: 20,
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

function minVal(item) {
  if (item === "Temperature") return 30;
  return 0;
}

// found max values by going through clean data and using "df_conflict.groupby('Fatalities').max()" etc.
function maxVal(item) {
  if (item === "Temperature") return 120; // max in clean is 109.6
  if (item.includes("Fatalities")) return 700; // max in clean is 587
  if (item.includes("Maize")) return 40000; // max in clean is 36600
  if (item.includes("Rice")) return 30000; // max in clean is 25000, but max in raw is 60000
  if (item.includes("Sorghum")) return 40000;
  if (item.includes("Cowpeas")) return 100000; // max in clean is 80000
  return 100;
}

function BarGraphInput({ datapoint, color, label, disabled, name, cb ,visible}) {
  const classes = useStyles();

  const [value, setValue] = useState(datapoint);
  
  if(visible){
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
              value={value}
              style={{ "color": color }}
              onChange={(_, v) => {
                setValue(v);
                cb(v);
              }}
              disabled={disabled}
              min={minVal(name)}
              max={maxVal(name)}
            />
          </Paper>
          <Paper className={classes.label}>{label}</Paper>
        </div>
      );
  } else {
    return null
  }
}

// creates vertical sliders with labels (e.g. for adjusting rainfall)
function GraphInput(props) {
  
  const classes = useStyles();
  let data = props.data;
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        {data.map((x,i) => (
          // only allows the most recent 6 entries to be editable
          <BarGraphInput
            key={i} 
            datapoint={Math.round(x.value)}
            color = {"cb" in x? props.color:"grey"}
            label={x.label}
            disabled = {!("cb" in x)}
            name={props.name}
            cb={x.cb}
            visible = {props.name !== "Temperature" || (i >= 6 && props.isRecent) || (i < 12 && !props.isRecent)}/>
        ))}
      </Grid>
    </div>
  );
}

function includeUnitsInTitle(title) {
  if (title === "Temperature") return "Temperature: °F";
  if (title.includes("Maize") || title.includes("Rice") || title.includes("Sorghum") || title.includes("Cowpeas")) return title + ": SOS per kg";
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

function ConvertYearMonthToGraphLabel(year, month) {
  return MONTH_MAP.get(month) + "'" + year.slice(-2);
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
          <GraphInput key={props.name} data={props.data} color={props.backgroundColor} name={props.name} isRecent={props.isRecent}/>
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

function NoRegionView({ isQuerying }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fade
          in={isQuerying}
          unmountOnExit
        >
        <div className={classes.centeredBox}>
          <div className={classes.info}>
            <CircularProgress />
          </div>
          <div className={classes.info}>
            <Typography>Loading Data ...</Typography>
          </div>
        </div>
      </Fade>
      <Fade
          in={!isQuerying}
          unmountOnExit
        >
          <div className={classes.centeredBox} style={{padding: 80}}>
            <Typography>Select a region on the map to the left to load up the data and start running some simulations</Typography>
          </div>
        </Fade>
    </div>
  );
}

function ControlList({data,tempData, isRecent, initReady}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.settingsList}>
        <div className={classes.info}>
          <Typography gutterBottom={true} variant="h5">Data Simulation</Typography>
          <Typography variant="body2">Adjust the data for the following year to simulate different scenarios and see the impact it has on the famine likelihood.</Typography>
        </div>
        {(tempData!=[] && initReady) ? 
        <Dataset
            data = {tempData}
            backgroundColor = {chooseColor("Temperature")}
            name={"Temperature"}
            isRecent = {isRecent} />
          : null }
        {(data && initReady) ? Object.keys(data).map((k,i) => (
          <Dataset
            key={i+1}
            data={data[k]}
            backgroundColor={chooseColor(k)}
            name={k}
            isRecent = {isRecent} />
        )) : null}
      </div>
    </div>
  );
}

function ControlView({region, isQuerying, setIsQuerying, setChangedValues, setDataReady, initReady}) {
  const classes = useStyles();

  const [data, setData] = useState({});
  const [tempData, setTempData] = useState([]);
  const [isRecent, setIsRecent] = useState({});
  
  useEffect(() => {
    fetch(`http://${API_ENDPOINT}:5000/data/all`, {
      crossDomain: true,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then((result) => {
        let datasets = {}
        let tempDataInit = false
        let tempData = []
        let isRecentObject = {}
        Object.keys(result["regions"]).filter(region => result["regions"][region].fitted).map(region => {
          // region specific
          let df = result["regions"][region]
          let region_dataset = {}
          
          let most_recent_quarter = df.historical_data._end_quarter
          let most_recent_year = df.historical_data._end_year
          isRecentObject[region] = (most_recent_quarter == 4 && most_recent_year==2019)
          
          df.historical_data._feature_names.forEach((name, i)=>{
            
            let hist_df = df.historical_data[name]
            let value_column_name = df.historical_data._value_columns[name]
            
            let hist_feat_cols = hist_df.columns
            let hist_date_column = hist_feat_cols.findIndex(x => x === "Date");
            let hist_year_column = hist_feat_cols.findIndex(x => x === "Year");
            let hist_month_column = hist_feat_cols.findIndex(x => x === "Month");
            let hist_value_column = hist_feat_cols.findIndex(x => x === value_column_name)
            
            let hist_rows = hist_df.rows.sort((a,b) => a[hist_date_column] > b[hist_date_column]).slice(-6)
            let last_date = hist_rows[hist_rows.length-1][hist_date_column]
            

            let pred_df = df.predicted_data[name]
            let pred_feat_cols = pred_df.columns
            let pred_date_column = pred_feat_cols.findIndex(x=> x === "Date");
            let pred_year_column = pred_feat_cols.findIndex(x=> x === "Year");
            let pred_month_column = pred_feat_cols.findIndex(x=> x === "Month");
            let pred_value_column = pred_feat_cols.findIndex(x => x === value_column_name)
            let pred_rows = pred_df.rows.filter(row => row[pred_date_column] > last_date)
                                        .sort((a,b) => a[pred_date_column] > b[pred_date_column]).slice(0,6)
            
            if(name === "Temperature"){
              if(!tempDataInit && most_recent_quarter == 4 && most_recent_year == 2019){
                hist_rows = hist_df.rows.sort((a,b) => a[hist_date_column] > b[hist_date_column]).slice(-12)
                pred_rows = pred_df.rows.filter(row => row[pred_date_column] > last_date)
                                            .sort((a,b) => a[pred_date_column] > b[pred_date_column]).slice(0,6)
                tempData = 
                  hist_rows.map(row => {
                    return {
                      label: ConvertYearMonthToGraphLabel(row[hist_year_column].toString(), row[hist_month_column].toString()),
                      value: row[hist_value_column]
                    }
                  }).concat(
                    pred_rows.map(row => {
                      return {
                        label: ConvertYearMonthToGraphLabel(row[pred_year_column].toString(), row[pred_month_column].toString()),
                        value: row[pred_value_column],
                        cb: setChangedValues(name, row[pred_year_column], row[pred_month_column], value_column_name, ""),
                      }
                    })
                  )
                tempDataInit = true
              }
              return  
            }
            
            
            
            region_dataset[name] = 
              hist_rows.map(row => {
                return {
                  label: ConvertYearMonthToGraphLabel(row[hist_year_column].toString(), row[hist_month_column].toString()),
                  value: row[hist_value_column]
                }
              }).concat(
                pred_rows.map(row => {
                  return {
                    label: ConvertYearMonthToGraphLabel(row[pred_year_column].toString(), row[pred_month_column].toString()),
                    value: row[pred_value_column],
                    cb: setChangedValues(name, row[pred_year_column], row[pred_month_column], value_column_name, region),
                  }
                })
              )
            
          })
          datasets[region] = region_dataset
        })

        setData(datasets);
        setTempData(tempData)
        setIsRecent(isRecentObject)
        setDataReady(true)
      })
      .catch(console.log);
  }, [setChangedValues, setData]);

  // if no region set, tell user what to do
  if (region === "") {
    return (
    <NoRegionView isQuerying={isQuerying}/>
    )
  }
  else {
    return (
      <SplitPane split="horizontal" defaultSize="85%">
        
        <ControlList
          data={region === "" ? null:data[region]}
          isRecent = {region === "" || isRecent[region]}
          tempData = {tempData}
          initReady = {initReady}
        />
        <div className={classes.root}>
          <RecalculateView initReady={initReady} isQuerying={isQuerying} setIsQuerying={setIsQuerying} region={region}/>
        </div>
      </SplitPane>
    );
  }
}

export default ControlView;
