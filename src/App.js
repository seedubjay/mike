import React from 'react';

import SplitPane, { Pane } from 'react-split-pane';
import { Slider, makeStyles } from '@material-ui/core';
import './App.css';

import MapView from './MapView';
import ControlView from './ControlView';
import AnalysisView from './AnalysisView';

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

  return (
    <div className={classes.root}>
<<<<<<< HEAD
      <SplitPane split="vertical" defaultSize="76%">
        <SplitPane split="horizontal" defaultSize="60%">
          <MapView/>
          <AnalysisView/>
        </SplitPane>
        <ControlView/>
=======
      <SplitPane split="vertical" defaultSize="80%">
        <MapView/>
        <ControlView region="Somalia"/>
>>>>>>> 90aab905b93be64a1cb58f26221cd4119c587b2a
      </SplitPane>
    </div>
  );
}

export default App;
