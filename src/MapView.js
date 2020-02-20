import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import somaliaRegions from './regions.json';

const useStyles = makeStyles(theme => ({
  mapBox: {
    width: 600,
    display: "block",
    margin: "auto",
  },
  mapView: {
    backgroundColor: "white",
  },
}));

const regionAnimation = {
  normal: {
    fill:"rgb(200,200,200)",
    stroke:1,
  },
  hover: {
    alpha: 1,
    scale: 1.1,
  }
}

function RegionHighlight({key, regionName}) {
  const x = useMotionValue(0);
  const c = useTransform(x, [0,1], ["rgb(200,200,200)", "rgb(150,255,150)"]);
  const s = useTransform(x, [0,1], [1, 1.1]);
  const o = useTransform(x, i => i < 0.01 ? 0 : 1);
  return (
    <motion.path
      key={key}
      d={somaliaRegions[regionName]}
      style={{ x }}
      fill={c}
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
      />
  )
}

function MapView({}) {

  console.log([1,4,2,4].sort((a,b) => a-b));
  const classes = useStyles();
  const [hover, setHover] = useState("");
  return (
    <div className={classes.mapView}>
      <div className={classes.mapBox}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1051.004 1338">
          {
            Object.keys(somaliaRegions).sort((a,b) => (a === hover) === (b === hover) ? 0 : ((a === hover) ? 1:-1)).map((regionName, i) => (
              <motion.path
                key={i}
                d={somaliaRegions[regionName]}
                fill="rgb(200, 200, 200)"
                stroke="white"
                strokeWidth={3}
                />
            ))
          }
          {
            Object.keys(somaliaRegions).map((regionName, i) => (
                <RegionHighlight key={i+200} regionName={regionName}/>
            ))
          }
        </svg>
      </div>
    </div>
  );
}

export default MapView;
