import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import somaliaRegions from './regions.js';

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
  const x = useSpring(0, {stiffness: 400});
  const c = useTransform(x, [0,1], ["rgb(200,200,200)", "rgb(150,255,150)"]);
  const s = useTransform(x, [0,1], [1, 1.1]);
  const o = useTransform(x, i => i < 0.5 ? 0 : 1);
  return (
    <motion.path
      key={key}
      d={somaliaRegions[regionName]}
      fill={c}
      scale={s}
      opacity={o}
      onHoverStart={() => {console.log("hover start");x.set(1);}}
      onHoverEnd={() => {console.log("hover end"); x.set(0);}}
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
