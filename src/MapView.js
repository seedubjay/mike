import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import somaliaRegions from './regions.json';
import DetailDrawer from './DetailDrawer';

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
  }
}));

function RegionBackground({key, regionName, detail}) {
  return (
    <motion.path
      key={key}
      d={somaliaRegions[regionName]}
      fill={detail === regionName ? "rgb(150,150,150)" : "rgb(200,200,200)"}
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
        if (detail == regionName) {
          setDetail("");
        } else {
          setDetail(regionName);
        }
      }}
      />
  )
}

function MapView({}) {

  const classes = useStyles();

  const [detail, setDetail] = useState("");

  return (
    <div className={classes.root}>
      <div className={classes.mapView} onTap={() => {setDetail("");}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1051.004 1338"
            className={classes.mapSvg}>
            {
              Object.keys(somaliaRegions).map((regionName, i) => (
                <RegionBackground key={i} regionName={regionName} detail={detail}/>
              ))
            }
            {
              Object.keys(somaliaRegions).map((regionName, i) => (
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
