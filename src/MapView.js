import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import somaliaRegions from './regions.json';
import DetailDrawer from './DetailDrawer';
import regionData from './regionData'

const availableRegions = Object.keys(regionData);

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
  title: {
    margin: 5,
    marginLeft: 30,
  }
}));

function RegionBackground({key, regionName, detail, ipcSeverity}) {
  // TODO: may have to convert ipcSeverity from string to float
  // ipcSeverity may be the proportion of people on IPC level 3 and above
  
  let unSelectedColour;
  switch(ipcSeverity){
    // TODO: may have to change this comparison, depending on what the undefined/null value is
    case ipcSeverity === undefined:
      unSelectedColour = "Grey";
      break;
    case ipcSeverity < 0.2:
      unSelectedColour = "LightPink";
      break;
    case ipcSeverity < 0.5:
      unSelectedColour = "Red";
      break;
    default:
      unSelectedColour = "Maroon";
      break;
  }
  
  return (
    <motion.path
      key={key}
      d={somaliaRegions[regionName]}
      fill={detail === regionName ? "Black" : unSelectedColour} // previously "rgb(150,150,150)": "rgb(200,200,200)"
      stroke="white"
      strokeWidth={2}
      />
  )
}

function RegionHighlight({key, regionName, detail, setDetail}) {
  const x = useMotionValue(0);
  const c = useTransform(x, [0,1], [detail === regionName ? "rgb(150,150,150)" : "rgb(200,200,200)", "rgb(150,255,150)"]);
  const s = useTransform(x, [0,1], [1, 1.2]);
  const o = useTransform(x, i => i < 0.01 ? 0 : 1);
  return (
    <motion.path
      key={key}
      d={somaliaRegions[regionName]}
      style={{ x }}
      fill={c}
      stroke="white"
      strokeWidth={0}
      scale={s}
      opacity={o}
      initial={{
        x:0,
        transition: {duration: 0},
      }}
      whileHover={{
        x:1,
        transition: {duration: 0.1}
      }}
      onTap={() => {
        if (detail == regionName || !availableRegions.includes(regionName)) {
          setDetail("");
        } else {
          setDetail(regionName);          
        }
      }}
      />
  )
}

function MapView({detail, setDetail}) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h1>Somalia</h1>
      </div>
      <div className={classes.mapView} onTap={() => {setDetail("");}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1051.004 1338"
            className={classes.mapSvg}>
            {
              Object.keys(somaliaRegions).map((regionName, i) => (
                <RegionBackground key={i} regionName={regionName} detail={detail} ipcSeverity={0.3}/>
              ))
            }
            {
              Object.keys(somaliaRegions).filter(regionName => availableRegions.includes(regionName)).map((regionName, i) => (
                  <RegionHighlight key={i+200} regionName={regionName} detail={detail} setDetail={setDetail}/>
              ))
            }
          </svg>
      </div>
      <DetailDrawer detail={detail} setDetail={setDetail}/>
    </div>
  );
}

export default MapView;
