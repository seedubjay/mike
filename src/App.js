import React, { useState, useRef } from 'react';

import SplitPane from 'react-split-pane';
import { makeStyles } from '@material-ui/core';
import './App.css';

import MapView from './MapView';
import ControlView from './ControlView';

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
  const [isQuerying, setIsQuerying] = useState(true);
  let [regionFactors, setRegionFactors] = useState({});

  const changedValueSeen = useRef(new Set());
  const changedValues = useRef([]);

  function setChangedValues(source, year, month, column) {
    return v => {
      let k = `${source}_${year}_${month}`
      if (changedValueSeen.current.has(k)) return;
      changedValueSeen.current.add(k)
      changedValues.current.push({source: source, year: year, month: month, column: column, value: v});
    }
  }

  return (
    <div className={classes.root}>
      
      <SplitPane split="vertical" defaultSize={650} primary="second">
        <MapView detail={detail} setDetail={setDetail} isQuerying={isQuerying} setIsQuerying={setIsQuerying} changedValues={changedValues} regionFactors={regionFactors}/>
        <ControlView region={detail} isQuerying={isQuerying} setIsQuerying={setIsQuerying} setChangedValues={setChangedValues} regionFactors={regionFactors} setRegionFactors={setRegionFactors} />
      </SplitPane>
    </div>
  );
}

export default App;
