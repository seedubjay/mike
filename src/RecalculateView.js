import React from 'react';

import SplitPane, { Pane } from 'react-split-pane';



function RecalculateView() {
    return (
      <div style={{backgroundColor: "#E4E4E4",
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                   width: "100%",
                   height: "100%"}}>
          <button onClick={CallAPI}><h2>Re-run the model</h2></button>
      </div>
    );
}

function CallAPI() {
  alert("hello world");
  return;
}
  
export default RecalculateView;