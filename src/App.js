import React, { useState, useRef, useEffect } from 'react';

import SplitPane from 'react-split-pane';
import { makeStyles } from '@material-ui/core';

import MapView from './MapView';
import ControlView from './ControlView';
import somaliaRegions from './regions.json';

const useStyles = makeStyles(theme => ({
  root: {
  },
  leftPane: {
    width:"80%",
    margin: "auto",
    backgroundColor: "white",
  },
  rightPane: {
    width:"20%",
    backgroundColor: "lightgray",
  },
}));

function App() {
  const classes = useStyles();

  const [detail, setDetail] = useState("");
  const [isQuerying, setIsQuerying] = useState(false);
  const [predReady, setPredReady] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [initReady, setInitReady] = useState(false);
  let [regionFactors, setRegionFactors] = useState({});

  const changedValuesObject = useRef({});
  function setChangedValues(source, year, month, column, region) {
    return v => {
      let k = `${source}_${year}_${month}`
      if (region === ""){
        Object.keys(somaliaRegions).forEach((region, i) => {
            if(!(region in changedValuesObject.current)){
              changedValuesObject.current[region] = {}
            }
            changedValuesObject.current[region][k] = {source: source, year:year, month:month, column:column, value:v}
        })
      } else {
        if(!(region in changedValuesObject.current)){
          changedValuesObject.current[region] = {}
        }
        changedValuesObject.current[region][k] = {source: source, year:year, month:month, column:column, value:v}
      }
    }
  }
  
  useEffect(()=>{
    if(predReady && dataReady){
      setInitReady(true)
    }
  },[predReady, dataReady])
  
  return (
    <div className={classes.root}>
      
      <SplitPane split="vertical" defaultSize={650} primary="second">
        <MapView detail={detail} setDetail={setDetail} isQuerying={isQuerying} setIsQuerying={setIsQuerying} regionFactors={regionFactors} changedValuesObject={changedValuesObject} setPredReady={setPredReady}/>
        <ControlView region={detail} isQuerying={isQuerying} setIsQuerying={setIsQuerying} setChangedValues={setChangedValues} regionFactors={regionFactors} setRegionFactors={setRegionFactors} setDataReady={setDataReady} initReady={initReady}/>
      </SplitPane>
    </div>
  );
}

export default App;
