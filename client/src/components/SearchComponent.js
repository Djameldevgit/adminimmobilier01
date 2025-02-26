import React, { useState, useEffect } from "react";
import communesjson from "../json/communes.json";

const SearchComponent = ({ filters, setFilters }) => {
  // Estado para Wilaya y Commune
  const [wilaya, setWilaya] = useState(filters.wilaya || "");
  const [commune, setCommune] = useState(filters.commune || "");

  // Obtener lista de wilayas sin duplicados
  const wilayaOptions = [...new Set(communesjson.map((item) => item.wilaya))];

  // Obtener lista de communes según la wilaya seleccionada
  const communeOptions = wilaya
    ? communesjson.find((item) => item.wilaya === wilaya)?.commune || []
    : [];

  // Resetear commune cuando se cambia la wilaya
  useEffect(() => {
    setCommune("");
  }, [wilaya]);

  // Manejar cambios y actualizar filtros en el Home
  const handleWilayaChange = (e) => {
    const selectedWilaya = e.target.value;
    setWilaya(selectedWilaya);
    setFilters((prev) => ({ ...prev, wilaya: selectedWilaya, commune: "" }));
  };

  const handleCommuneChange = (e) => {
    const selectedCommune = e.target.value;
    setCommune(selectedCommune);
    setFilters((prev) => ({ ...prev, commune: selectedCommune }));
  };

  return (
    <div>
      {/* Select para Wilaya */}
        <select value={wilaya} onChange={handleWilayaChange}>
         {wilayaOptions.map((w, index) => (
          <option key={index} value={w}>
            {w}
          </option>
        ))}
      </select>

      {/* Select para Commune (dependiente de Wilaya) */}
     
      <select value={commune} onChange={handleCommuneChange} disabled={!wilaya}>
        <option value="">Seleccione una Commune</option>
        {communeOptions.map((c, index) => (
          <option key={index} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchComponent;

