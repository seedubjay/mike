import React, { useState, useEffect, useRef } from 'react';

import SplitPane, { Pane } from 'react-split-pane';
import { Slider, makeStyles } from '@material-ui/core';
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

  const [isQuerying, setIsQuerying] = useState(false);

  const changedValues = useRef(new Map());

  function setChangedValues(name, year, month) {
    return v => {
      console.log(name, year, month);
      let k = `${name}_${year}_${month}`
      if (k in changedValues) return;
      changedValues.current.set(k, {name: name, year: year, month: month, value: v});
    }
  }

  useEffect(() => {
    if (isQuerying) {
      // DO A QUERY WITH changedValues
      console.log("QUERY");
      console.log(changedValues.current);
      setIsQuerying(false);
    }
  }, [isQuerying]);

  return (
    <div className={classes.root}>
      
      <SplitPane split="vertical" defaultSize={650} primary="second">
        <MapView detail={detail} setDetail={setDetail}/>
        <ControlView region={detail} isQuerying={isQuerying} setIsQuerying={setIsQuerying} setChangedValues={setChangedValues} />
      </SplitPane>
    </div>
  );
}

export default App;
