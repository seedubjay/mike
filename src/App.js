import React from 'react';

import SplitPane, { Pane } from 'react-split-pane';
import { Slider, makeStyles } from '@material-ui/core';
import './App.css';

import MapView from './MapView';
import ControlView from './ControlView';
import RecalculateView from './RecalculateView';

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

  return (
    <div className={classes.root}>
      
      <SplitPane split="vertical" defaultSize={350} primary="second">
        <MapView detail={detail} setDetail={setDetail}/>
        <SplitPane split="horizontal" defaultSize="85%">
          <ControlView region={detail}/>
          <RecalculateView/>
        </SplitPane>
      </SplitPane>
    </div>
  );
}

export default App;
