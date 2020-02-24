import React from 'react';

function RecalculateView() {
    return (
      <div style={{backgroundColor: "#E4E4E4",
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                   width: "100%",
                   height: "100%"}}>
          <button onClick={handleClick}><h2>Re-run the model</h2></button>
      </div>
    );
}

function handleClick() {
  //TODO: link up to backend
  alert("Hello World");
  return;
}
  
export default RecalculateView;