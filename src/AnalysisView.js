import React from 'react';

import SplitPane, { Pane } from 'react-split-pane';

function ConfidenceInterval() {
    return (
        <div>
            <h1>confidence interval</h1>
        </div>
    );
}

function Stats() {
    return (
        <div>
            <h1>Stats</h1>
        </div>
    );
}

function AnalysisView() {
    return (
      <div style={{backgroundColor: "lightgray"}}>
          <SplitPane split="vertical" defaultSize="80%">
              <Stats/>
              <ConfidenceInterval/>
          </SplitPane>
      </div>
    );
  }
  
  export default AnalysisView;