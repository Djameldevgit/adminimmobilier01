import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceRangeFilter = ({ filters, setFilters }) => {
  // Valores iniciales de precio
  const [priceRange, setPriceRange] = useState([
    filters.minPrice || 500, 
    filters.maxPrice || 2000000
  ]);

  // Manejar cambios en el slider
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
      <label className="text-primary">Rango de Precios</label>
      <div style={{ padding: "0 20px" }}>
        <Slider
          range
          min={500}
          max={2000000}
          step={500}
          value={priceRange}
          onChange={handleRangeChange}
          trackStyle={[{ backgroundColor: "#44EB00", height: 10 }]}
          handleStyle={[
            {
              borderColor: "#00AF72",
              height: 20,
              width: 20,
              marginLeft: -10,
              marginTop: -5,
              backgroundColor: "#007bff",
            },
            {
              borderColor: "#00AF72",
              height: 20,
              width: 20,
              marginLeft: -10,
              marginTop: -5,
              backgroundColor: "#007bff",
            },
          ]}
          railStyle={{ backgroundColor: "#ccc", height: 10 }}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <span>Min: {priceRange[0]} DA</span> - <span>Max: {priceRange[1]} DA</span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
