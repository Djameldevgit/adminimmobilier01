import React from "react";

const RangoSuperficie = ({ filters, setFilters }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      surfaceRange: name === "minSurface" 
        ? [Number(value), prevFilters.surfaceRange[1]]
        : [prevFilters.surfaceRange[0], Number(value)],
    }));
  };

  return (
    <div className="container">
      
    </div>
  );
};

export default RangoSuperficie;
