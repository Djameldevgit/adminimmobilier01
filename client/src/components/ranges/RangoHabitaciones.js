import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const RangoHabitaciones = () => {
  const [roomRange, setRoomRange] = useState([1, 10]);
  const [surfaceRange, setSurfaceRange] = useState([20, 1000]);

  const handleRangeChange = (values, type) => {
    if (type === "rooms") setRoomRange(values);
    else if (type === "surface") setSurfaceRange(values);
  };

  return (
    <div className='container'>
      <label className="text-primary">Número de Habitaciones</label>
      <Slider
        range
        min={1}
        max={10}
        step={1}
        value={roomRange}
        onChange={(values) => handleRangeChange(values, "rooms")}
        trackStyle={[{ backgroundColor: "#44EB00", height: 10 }]}
        handleStyle={[
          { borderColor: "#00AF72", height: 20, width: 20, marginLeft: -10, marginTop: -5, backgroundColor: "#007bff" },
          { borderColor: "#00AF72", height: 20, width: 20, marginLeft: -10, marginTop: -5, backgroundColor: "#007bff" },
        ]}
        railStyle={{ backgroundColor: "#ccc", height: 10 }}
      />
      <div style={{ marginTop: 10 }}>
        <span>Min: {roomRange[0]}</span> - <span>Max: {roomRange[1]} habitaciones</span>
      </div>

      <label className="text-primary">Superficie (m²)</label>
      <Slider
        range
        min={20}
        max={1000}
        step={10}
        value={surfaceRange}
        onChange={(values) => handleRangeChange(values, "surface")}
        trackStyle={[{ backgroundColor: "#44EB00", height: 10 }]}
        handleStyle={[
          { borderColor: "#00AF72", height: 20, width: 20, marginLeft: -10, marginTop: -5, backgroundColor: "#007bff" },
          { borderColor: "#00AF72", height: 20, width: 20, marginLeft: -10, marginTop: -5, backgroundColor: "#007bff" },
        ]}
        railStyle={{ backgroundColor: "#ccc", height: 10 }}
      />
      <div style={{ marginTop: 10 }}>
        <span>Min: {surfaceRange[0]} m²</span> - <span>Max: {surfaceRange[1]} m²</span>
      </div>
    </div>
  );
};

export default RangoHabitaciones;
