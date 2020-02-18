import React from 'react';
import shape from './Somalia_regions_map.svg';
import './Map.css';

function Map() {
  return (
    <div className="Map">
      <img src={shape} className="Map-shape" alt="map"/>
    </div>
  );
}

export default Map;
