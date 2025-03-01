import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const RangoSuperficie = ({ filters, setFilters }) => {
  const [superficie, setSuperficie] = useState([20, 1000]);

  const handleRangeChange = (values) => {
    setSuperficie(values);
    setFilters({ ...filters, minSurface: values[0], maxSurface: values[1] });
  };

  return (
    <div className="container">
      <label className="text-primary">Superficie (m²)</label>
      <Slider
        range
        min={20}
        max={1000}
        step={10}
        value={superficie}
        onChange={handleRangeChange}
        trackStyle={[{ backgroundColor: "#44EB00", height: 10 }]}
        handleStyle={[
          { borderColor: "#00AF72", height: 20, width: 20, backgroundColor: "#007bff" },
          { borderColor: "#00AF72", height: 20, width: 20, backgroundColor: "#007bff" },
        ]}
        railStyle={{ backgroundColor: "#ccc", height: 10 }}
      />
      <div style={{ marginTop: 10 }}>
        <span>Min: {superficie[0]} m²</span> - <span>Max: {superficie[1]} m²</span>
      </div>
    </div>
  );
};

export default RangoSuperficie;
