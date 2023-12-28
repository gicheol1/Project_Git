// LocalFestival.js

import React, { useState, useEffect } from 'react';
import SelectRegion from './SelectRegion';
import FestivalList from './FestivalList';

const LocalFestival = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    if (selectedRegion) {
      // API 호출
      fetch(`http://localhost:8090/festivals?region=${selectedRegion}`)
        .then((response) => response.json())
        .then((data) => setFestivals(data))
        .catch((error) => console.error('Error fetching festival data:', error));
    }
  }, [selectedRegion]);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  return (
    <div>
      <SelectRegion onSelect={handleRegionSelect} />
      {selectedRegion && <FestivalList region={selectedRegion} festivals={festivals} />}
    </div>
  );
};

export default LocalFestival;
