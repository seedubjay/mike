import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SplitPane, { Pane } from 'react-split-pane';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {makeStyles, Container} from '@material-ui/core';
import regionData from './regionData'

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
    
  }));

function LikelihoodStat() {
    return (
        <div>
            <h2>Tier 2: __%</h2>
            <h2>Tier 3: __%</h2>
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


    //TODO: get columns to work
    return (
      <motion.div
        className={classes.detailDrawer}
        animate={detail === "" ? "closed" : "open"}
        variants={drawerVariants}
        onTap={() => {setDetail("");}}>
        
        <Container>
            <Row>
                <Col><LikelihoodStat /></Col>
                <Col><Stats details={details} name={detail}/> </Col>
            </Row>
             
        </Container>
        
      </motion.div>
    )
}
  
  export default DetailDrawer;