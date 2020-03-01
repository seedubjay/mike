import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { motion } from "framer-motion";
import {makeStyles, Typography} from '@material-ui/core';
import { Boxplot } from 'react-boxplot';
import regionData from './regionData'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      display: "flex",
      backgroundColor: "white",
    },
    mapView: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    mapSvg: {
      flex: 1,
    },
    detailDrawer: {
      height: 0,
      backgroundColor: "lightgray",
      overflow: "scroll",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginLeft: 20,
      marginRight: 20,
    },
    body: {
      padding: 10,
      marginTop: 10,
      marginLeft: "auto",
      marginRight: "auto",
    },
    panel: {
      backgroundColor: "#fcfcfc"
    },
    row: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      margin: 5,
    },
    col: {
      flex: "50%",
      margin: 20,
      marginTop: "auto",
      marginBottom: "auto",
    },
  }));

function convertFloatStringToPercent(floatString){
  return Math.round(parseFloat(floatString)*100).toString()
}

// e.g. "20201" becomes "2020 Q1"
function formatYearQuartileString(yearQuartileAPIString){
  if (typeof yearQuartileAPIString !== "string"){
    yearQuartileAPIString = yearQuartileAPIString.toString();
  }
  return yearQuartileAPIString.slice(0,4) + " Q" + yearQuartileAPIString.slice(yearQuartileAPIString.length-1);
}

function QuartileStats({ipcPredsForRegion, minCI, maxCI}) {
  const classes = useStyles();

  if(ipcPredsForRegion === undefined){
    return(<div>
              <h3 padding={0}>{"Famine Population Prediction"}</h3>
              <p>Data unavailable</p>
            </div>);
  }
  
  let phase2 = ipcPredsForRegion["P2"]['mean'];
  let phase3 = ipcPredsForRegion["P3"]['mean'];
  let phase4 = ipcPredsForRegion["P4"]['mean'];

  if(!("normalised" in ipcPredsForRegion)) {
    let sum = phase2 + phase3 + phase4;
    // normalise probabilities if sum is more than 1, which may happen since probabilities are 
    // predicted independently (for ease of understanding)
    if (sum>1) {
      let scale = 1/sum;
      for (let phase of ["P2", "P3", "P4"]){
        // some ugly handling of results being NaN
        if(ipcPredsForRegion[phase]["mean"]==="NaN"){
          return(<div>
                    <h3 padding={0}>{"Famine Population Prediction"}</h3>
                    <p>Data unavailable</p>
                  </div>);
        }
        ipcPredsForRegion[phase]["mean"] *= scale;

        for(let ci of ["95", "68"]){
          ipcPredsForRegion[phase][ci][0]*=scale;
          ipcPredsForRegion[phase][ci][1]*=scale;
        }
      }
    }
    ipcPredsForRegion["normalised"]=true;
  }

    // params: obj is an Object having relevant data about predictions for a particular IPC phase
    // e.g. {
        //   "68" : [0.2, 0.3],
        //   "95" : [0.1, 0.4],
        //   "mean" : 0.25
        // },
    return (
        <div style={{width: "100%"}}>
            {[["Phase 2", ipcPredsForRegion["P2"]],
            ["Phase 3", ipcPredsForRegion["P3"]],
            ["Phase 4", ipcPredsForRegion["P4"]]]
            .map(data => 
              <div class={classes.row}>
                <div class={classes.col} style={{display: "flex", marginTop: "auto", marginBottom: "auto", justifyContent: "space-around", verticalAlign: "center"}}>
                  <div style={{marginBottom: "auto", marginTop: "auto"}}><Typography variant="subtitle1">{data[0] + ":"}</Typography></div>
                  <Typography variant="h5">{convertFloatStringToPercent(data[1]["mean"]) + "%"}</Typography>
                </div>
                <div class={classes.col}>
                  <div style={{backgroundColor: "lightgray", padding: 10, width: 170}}>
                    <Boxplot
                      width={150}
                      height={20}
                      orientation="horizontal"
                      min={minCI}
                      max={maxCI}
                      stats={{
                        whiskerLow: data[1][95][0],
                        quartile1: data[1][68][0],
                        quartile2: data[1]["mean"],
                        quartile3: data[1][68][1],
                        whiskerHigh: data[1][95][1],
                        outliers: [],
                      }}
                    />
                  </div>
                </div>
              </div>)}
        </div>
    );
}

  // params: phase2 is an Object having relevant data about predictions for IPC Phase 2
  // e.g. {
      //   "68" : [0.2, 0.3],
      //   "95" : [0.1, 0.4],
      //   "mean" : 0.25
      // },
function LikelihoodStats({ipcPredsForRegion}) {
  const classes = useStyles();

  if(ipcPredsForRegion === undefined){
    return(
      <ExpansionPanel square className={classes.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{"Famine Population Prediction"}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>Data Unavailable</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  var minCI = 10000000;
  var maxCI = 0;

  //find min and max 95% CI to format boxplots
  for (let quarter of Object.keys(ipcPredsForRegion)) {
    for (let phase of ["P2", "P3", "P4"]) {
      if (ipcPredsForRegion[quarter][phase][95][0] < minCI) {
        minCI = ipcPredsForRegion[quarter][phase][95][0];
      }

      if (ipcPredsForRegion[quarter][phase][95][1] > maxCI) {
        maxCI = ipcPredsForRegion[quarter][phase][95][1];
      }
    }
  }

  console.log(minCI);
  console.log(maxCI);
  
  return (
    <div>
      {Object.keys(ipcPredsForRegion).map(quarter => 
        <ExpansionPanel square className={classes.panel}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{formatYearQuartileString(quarter) + " Population Prediction"}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <QuartileStats ipcPredsForRegion={ipcPredsForRegion[quarter]} minCI={minCI} maxCI={maxCI}></QuartileStats>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    )}
    </div>
  );
}

function QuartileGraph() {
  //TODO: MAKE THE GRAPH!!!
  return (
    <div style={{width: 300, height: 200, backgroundColor: "darkgray", marginLeft: "auto", marginRight: "auto", marginBottom: 20}}>
      <Typography variant="h6">Graph Here</Typography>
    </div>
  );
}

const drawerVariants = {
    open: {
      height: 250,
    },
    closed: {
      height: 0,
    }
  }

function DetailDrawer({detail, setDetail, ipcPreds}) {

    const classes = useStyles();

    var details;
    // TODO: not accurate! base this on the IPC predictions?
    //
    if (typeof regionData[detail] !== "undefined") {
        details = regionData[detail].map(a => <div><p>{a}</p></div>);
    }

    return (
      <motion.div
        className={classes.detailDrawer}
        animate={detail === "" ? "closed" : "open"}
        variants={drawerVariants}>
      
        <div class={classes.header}>
          <div style={{marginTop: 20}}>
            <Typography variant="h5">{detail}</Typography>
          </div>
          <IconButton aria-label="expand">
                <ExpandMoreIcon onClick={() => {setDetail("");}}/>
          </IconButton>
        </div>
        <div class={classes.body}>
          <QuartileGraph></QuartileGraph>
          <LikelihoodStats ipcPredsForRegion={ipcPreds[detail]}/>
        </div>
      </motion.div>
    )
}
  
  export default DetailDrawer;