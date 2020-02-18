import React from 'react';
import {makeStyles} from '@material-ui/core';
import somaliaMap from './Somalia_regions_map.svg';

const useStyles = makeStyles(theme => ({
  mapBox: {
    width: 200,
    display: "block",
    margin: "auto",
  },
  mapView: {
    backgroundColor: "white",
    width: "100%",
  },
}));

function MapView() {
  const classes = useStyles();

  return (
    <div className={classes.mapView}>
      <img className={classes.mapBox} src={somaliaMap} alt={"map"}/>
    </div>
  );
}

export default MapView;
