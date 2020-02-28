import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Rectangle from 'react-rectangle';
import Tooltip from '@material-ui/core/Tooltip';
import somaliaRegions from './regions.json';
import DetailDrawer from './DetailDrawer';
import regionData from './regionData';

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
  },
  legend: {
    width: "22%",
    marginRight: 25,
    margin: 25,
    marginLeft: "auto",
    textAlign: "center",
  }
}));

function getRegionColour(ipcPreds, regionName) {
  let ipcSeverity;
  if (regionName in ipcPreds) {
    let ipcSpecificQuartilePreds = ipcPreds[regionName];
    
    // normalise sum of phase probabilities
    let phase2 = ipcSpecificQuartilePreds["P2"]["mean"];
    let phase3 = ipcSpecificQuartilePreds["P3"]["mean"];
    let phase4 = ipcSpecificQuartilePreds["P4"]["mean"];
    let sum = phase2 + phase3 + phase4;
    phase2 *= 1/sum;
    phase3 *= 1/sum;
    phase4 *= 1/sum;

    ipcSeverity = (phase2*1 + phase3*3 + phase4*5) / 3;
    
    const interpolate = require('color-interpolate');
    let colorGradient = interpolate(['yellow', 'orange', 'red']);
    return colorGradient(ipcSeverity);

  } else {
    return "lightgray";
  }
}

function RegionBackground({key, regionName, detail, colour}) {
  // ipcSeverity is currently the proportion of people on IPC level 3 and above
  // TODO: make it an interpolation of the official IPC level colours
  
  return (
    <motion.path
      key={key}
      d={somaliaRegions[regionName]}
      fill={colour} // previously "rgb(150,150,150)": "rgb(200,200,200)"
      stroke="white"
      strokeWidth={2}
      />
  )
}

function RegionHighlight({key, regionName, detail, setDetail, colour}) {
  const x = useMotionValue(0);
  const s = useTransform(x, [0,1], [1, 1.2]);
  const o = useTransform(x, i => i < 0.01 ? 0 : 1);
  return (
    <motion.path
      key={key}
      d={somaliaRegions[regionName]}
      style={{ x }}
      fill={colour}
      stroke="white"
      strokeWidth={2}
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
        if (detail === regionName) {
          setDetail("");
        } else {
          setDetail(regionName);          
        }
      }}
      />
  )
}

// e.g. "20201" becomes "2020Q1"
function formatYearQuartileString(yearQuartileAPIString){
  return yearQuartileAPIString.slice(0,4) + " Q" + yearQuartileAPIString.slice(yearQuartileAPIString.length-1);
}

function MapView({ detail, setDetail, isQuerying, setIsQuerying, changedValues, regionFactors }) {

  const classes = useStyles();

  const legendExplanation = "The colour of each region indicates the famine level from IPC Level 2 Borderline Food Insecure to IPC Level 4 Humanitarian Emergency";

  let [ipcPreds, setIPCPreds] = useState({});

  // TODO: allow the code to only fetch regional data on updates?
  useEffect(() => {
    if (isQuerying) {
      Promise.all(Object.keys(somaliaRegions).map(regionName => {
        return fetch(`http://localhost:5000/prediction/region/${regionName}`, {
          method: 'post',
          crossDomain: true,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({changes: changedValues.current.filter(v => regionName in regionFactors && regionFactors[regionName].includes(v.source))}),
        })
          .then(res => res.json())
          .then((result) => {
            if (!result.success) return [];
            let df = result["data"];
            let lastQuartilePredicted = Object.keys(df).reduce((a, b) => Math.max(a,b));
            return [regionName, df[lastQuartilePredicted]]
          })
          .catch(console.log);
      })).then((responses) => {
        console.log(responses);
        let preds = {}
        responses.filter(resp => resp.length > 0).forEach(resp => {
          preds[resp[0]] = resp[1]
        })
        setIPCPreds(preds);
        setIsQuerying(false);
      });
    }
  }, [isQuerying]);

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
                <RegionBackground key={i} regionName={regionName} detail={detail} colour={getRegionColour(ipcPreds, regionName)}/>
              ))
            }
            {
              Object.keys(somaliaRegions).filter(regionName => regionName in ipcPreds).map((regionName, i) => (
                <RegionHighlight key={i+200} regionName={regionName} detail={detail} setDetail={setDetail} colour={getRegionColour(ipcPreds, regionName)}/>
              ))
            }
          </svg>
      </div>
        <div class={classes.legend}>
          <Tooltip title={legendExplanation} arrow>
            <div>
              <span>IPC Level</span>
              <Rectangle aspectRatio={[25,4]}>
                <div style={{display: "flex", justifyContent: "space-between", background: "linear-gradient(0.25turn, yellow, orange, red)", width: "100%", height:"100%"}}>
                    <span style={{marginLeft: 3}}>2</span>
                    <span style={{marginRight: 3}}>4</span>
                </div>
              </Rectangle>
            </div>
          </Tooltip>
        </div>
      <DetailDrawer detail={detail} setDetail={setDetail} ipcPreds={ipcPreds}/>
    </div>
  );
}

export default MapView;
