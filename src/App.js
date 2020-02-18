import React from 'react';

import SplitPane, { Pane } from 'react-split-pane';
import { Slider } from '@material-ui/core';
import './App.css';

import Map from './Map';
import ControlPanel from './ControlPanel';

function App() {
  return (
    <div className="App">
      <SplitPane split="horizontal" defaultSize="50%">
        <Pane
          className="App-Pane-top"
          defaultSize="50%">
          <ControlPanel/>
        </Pane>
        <Pane
          className="App-Pane-bottom"
          defaultSize="50%">
          <Map/>
        </Pane>
      </SplitPane>
    </div>
  );
}

export default App;
