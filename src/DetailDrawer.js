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

function LikelihoodStat({tier2, tier3}) {
    return (
        <div>
            <h2>Tier 2: {tier2}%</h2>
            <h2>Tier 3: {tier3}%</h2>
        </div>
    );
}

function Stats({details, name}) {
    return (
        <div>
            <h2>{name}</h2>
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
            <LikelihoodStat tier2="__" tier3="__"/>
          </div>
          <div class={classes.col60}>
            <Stats details={details} name={detail}/>
          </div>
        </div>
        
      </motion.div>
    )
}
  
  export default DetailDrawer;