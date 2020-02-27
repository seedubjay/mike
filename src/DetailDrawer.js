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
    col1: {
      flex: "1%",
      "margin-top": 20,
      "margin-right":20,
    },
    col40: {
      flex: "40%",
      margin: 20,
    },
    col10: {
      flex: "50%",
      margin: 20,
    },
    col60: {
      flex: "60%",
      margin: 20,
    },
    col99: {
      flex: "99%",
      "margin-top": 20,
      "margin-right":20,
    },
  }));

function convertFloatStringToPercent(floatString){
  return (parseFloat(floatString)*100).toString()
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

  // params: tier2 is an Object having relevant data about predictions for IPC Phase 2
  // e.g. {
      //   "68" : [0.2, 0.3],
      //   "95" : [0.1, 0.4],
      //   "mean" : 0.25
      // },
function LikelihoodStat({tier2, tier3, tier4}) {
    return (
        <div>
            <h4 padding={0}>{"Phase 2: " + objectToStatistics(tier2)}</h4>
            <h4 padding={0}>{"Phase 3: " + objectToStatistics(tier3)}</h4>
            <h4 padding={0}>{"Phase 4: " + objectToStatistics(tier4)}</h4>
            <h6>* 95% confidence interval</h6>
        </div>
    );
}

function Stats({details, name}) {
    return (
        <div>
            <h3 padding={0}>{name}</h3>
            {details}
        </div>
    );
}

const drawerVariants = {
    open: {
      height: 200,
    },
    closed: {
      height: 0,
    }
  }

function DetailDrawer({detail, setDetail}) {

    const classes = useStyles();
  
    var details;
    if (typeof regionData[detail] === "undefined") {
        details = <p>{"Unfortunately, we don't have enough data to give an accurate model for this region."}</p>;
    } else {
        details = regionData[detail].map(a => <div><p>{a}</p></div>);
    }

    // TODO: replace this with actual data fetched from API
    // i.e. use an Object having relevant data about predictions for a particular IPC phase
      // e.g. {
          //   "68" : [0.2, 0.3],
          //   "95" : [0.1, 0.4],
          //   "mean" : 0.25
          // },
    let testData = {
      "68" : [0.2, 0.3],
      "95" : [0.1, 0.4],
      "mean" : 0.25
    }

    return (
      <motion.div
        className={classes.detailDrawer}
        animate={detail === "" ? "closed" : "open"}
        variants={drawerVariants}>
      
        <div class={classes.row}>
          <div class={classes.col99}>
          </div>
          <div class={classes.col1}>
          {/* consider using ExpandMoreIcon directly rather than IconButton to appear less laggy */}
          <IconButton aria-label="expand">
            <ExpandMoreIcon onClick={() => {setDetail("");}}/>
          </IconButton>
          </div>
        </div>
        <div class={classes.row}>
          <div class={classes.col40}>
            {/* TODO: replace with actual data fetched from API. Assuming there are only 4 tiers as shown in Freddie's GitHub repo example */}
            <LikelihoodStat tier2={testData} tier3={testData} tier4={testData}/>
          </div>
          <div class={classes.col60}>
            <Stats details={details} name={detail}/>
          </div>
        </div>
        
      </motion.div>
    )
}
  
  export default DetailDrawer;