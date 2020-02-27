import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SplitPane, { Pane } from 'react-split-pane';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {makeStyles, Container} from '@material-ui/core';
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
    row: {
      display: "flex",
    },
    collapseButtonCol: {
      flex: "1%",
      "margin-top": 20,
      "margin-right":20,
    },
    ipcCol: {
      flex: "50%",
      margin: 20,
    },
    regionFactorsCol: {
      flex: "50%",
      margin: 20,
    },
  }));

function convertFloatStringToPercent(floatString){
  return Math.round(parseFloat(floatString)*100).toString()
}

// params: obj is an Object having relevant data about predictions for a particular IPC phase
  // e.g. {
      //   "68" : [0.2, 0.3],
      //   "95" : [0.1, 0.4],
      //   "mean" : 0.25
      // },
function objectToStatistics (obj){
  return convertFloatStringToPercent(obj["mean"]) + "% (" + 
  convertFloatStringToPercent(obj[95][0]) + "-" + convertFloatStringToPercent(obj[95][1]) + "%)*";
}

  // params: phase2 is an Object having relevant data about predictions for IPC Phase 2
  // e.g. {
      //   "68" : [0.2, 0.3],
      //   "95" : [0.1, 0.4],
      //   "mean" : 0.25
      // },
function LikelihoodStat({ipcPredsForRegion}) {
  if(ipcPredsForRegion === undefined){
    return(<div></div>);
  }
  let quartile = Object.keys(ipcPredsForRegion)[0];
  // normalise sum of phase probabilities
  let phase2 = ipcPredsForRegion[quartile]["P2"]['mean'];
  let phase3 = ipcPredsForRegion[quartile]["P3"]['mean'];
  let phase4 = ipcPredsForRegion[quartile]["P4"]['mean'];
  let sum = phase2 + phase3 + phase4;
  phase2 *= 1/sum;
  phase3 *= 1/sum;
  phase4 *= 1/sum;
  ipcPredsForRegion[quartile]["P2"]['mean'] = phase2;
  ipcPredsForRegion[quartile]["P3"]['mean'] = phase3;
  ipcPredsForRegion[quartile]["P4"]['mean'] = phase4;
    return (
        <div>
            <h3 padding={0}>{quartile + " Population Prediction"}</h3>
            {["Phase 2: " + objectToStatistics(ipcPredsForRegion[quartile]["P2"]),
            "Phase 3: " + objectToStatistics(ipcPredsForRegion[quartile]["P3"]),
            "Phase 4: " + objectToStatistics(ipcPredsForRegion[quartile]["P4"])].map(a => <div><p>{a}</p></div>)}
            <small>* 95% confidence interval</small>
        </div>
    );
}

function Stats({details, name}) {
    return (
        <div>
            <h3 padding={0}>{"Location: " + name}</h3>
            {details}
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
    // TODO: is this still accurate? Or should we base this on the IPC predictions?
    if (typeof regionData[detail] !== "undefined") {
        details = regionData[detail].map(a => <div><p>{a}</p></div>);
    }

    // if (typeof regionData[detail] === "undefined") {
    //   details = <p>{"Unfortunately, we don't have enough data to give an accurate model for this region."}</p>;
    // } else {
    //     details = regionData[detail].map(a => <div><p>{a}</p></div>);
    // }

    return (
      <motion.div
        className={classes.detailDrawer}
        animate={detail === "" ? "closed" : "open"}
        variants={drawerVariants}>
      
        
        <div className={classes.row}>
          <div className={classes.ipcCol}>
            <LikelihoodStat ipcPredsForRegion={ipcPreds[detail]}/>
          </div>
          <div class={classes.regionFactorsCol}>
            <Stats details={details} name={detail}/>
          </div>
          <div class={classes.collapseButtonCol}>
            {/* consider using ExpandMoreIcon directly rather than IconButton to appear less laggy */}
            <IconButton aria-label="expand">
              <ExpandMoreIcon onClick={() => {setDetail("");}}/>
            </IconButton>
          </div>
        </div>
        
      </motion.div>
    )
}
  
  export default DetailDrawer;