import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
 
const PriceRangeFilter = ({ filters, setFilters }) => {
  const [priceRange, setPriceRange] = useState([
    filters.minPrice || 500, 
    filters.maxPrice || 2000000
  ]);

  const handleRangeChange = (values) => {
    setPriceRange(values);
    setFilters((prev) => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1],
    }));
  };

  return (
    <div className="card-body form-group">
      <label className="text-primary mt-4">Gamme de prix</label>
      <div style={{ padding: "0 10px" }}>
        <Slider
          range
          min={500}
          max={2000000}
          step={500}
          value={priceRange}
          onChange={handleRangeChange}
          className="custom-slider" // Aplica la clase personalizada
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <span>Minimum: {priceRange[0]}  </span> - <span>Maximum: {priceRange[1]}  </span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
