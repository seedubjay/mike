import React from 'react';
import {makeStyles} from '@material-ui/core';
import shape from './Somalia_regions_map.svg';

const useStyles = makeStyles(theme => ({
  mapShape: {
    height: "40vmin",
  },
  map: {
    backgroundColor: "lightgray",
  },
}));

function Map() {
  const classes = useStyles();

  return (
    <div className={classes.map}>
      <img src={shape} className={classes.mapShape} alt="map"/>
    </div>
  );
}

export default Map;
