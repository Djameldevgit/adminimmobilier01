import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const RangoHabitaciones = ({ filters, setFilters }) => {
  const [habitaciones, setHabitaciones] = useState([1, 10]);

  const handleRangeChange = (values) => {
    setHabitaciones(values);
    setFilters({ ...filters, minRooms: values[0], maxRooms: values[1] });
  };

  return (
    <div className="container">
      <label className="text-primary">Número de Habitaciones</label>
      <Slider
        range
        min={1}
        max={10}
        step={1}
        value={habitaciones}
        onChange={handleRangeChange}
        trackStyle={[{ backgroundColor: "#44EB00", height: 10 }]}
        handleStyle={[
          { borderColor: "#00AF72", height: 20, width: 20, backgroundColor: "#007bff" },
          { borderColor: "#00AF72", height: 20, width: 20, backgroundColor: "#007bff" },
        ]}
        railStyle={{ backgroundColor: "#ccc", height: 10 }}
      />
      <div style={{ marginTop: 10 }}>
        <span>Min: {habitaciones[0]}</span> - <span>Max: {habitaciones[1]} habitaciones</span>
      </div>
    </div>
  );
};

export default RangoHabitaciones;
