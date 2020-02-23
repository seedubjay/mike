import React from 'react';

import SplitPane, { Pane } from 'react-split-pane';



function RecalculateView() {
    return (
      <div style={{backgroundColor: "lightblue",
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                   width: "100%"}}>
          <button onClick={() => alert("hello")}><h2>Re-run the model</h2></button>
      </div>
    );
  }
  
export default RecalculateView;