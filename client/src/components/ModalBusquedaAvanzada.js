import React from 'react';
 
import SearchComponent from './SearchComponent';
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import PriceRangeFilter from './ranges/PriceRangeFilter';

const ModalBusquedaAvanzada = ({  
    showModal, 
    handleCloseModal, 
    filters = {}, // Asegurar un objeto vacío
    setFilters = () => {}, 
    handleSearch, 
    handleResetFilters 
}) => {
    const { languageReducer } = useSelector(state => state);
    const { t } = useTranslation();

    if (!showModal) return null;

    return (
        <div className="modal-busqueda">
        <div className="modal-content-busqueda">
            <button className="close-top-btn" onClick={handleCloseModal}>
                &times;
            </button>
            {t('Select fields', { lng: languageReducer.language })}
                <select className='select-busqueda' name="subCategory" onChange={(e) => setFilters({ ...filters, subCategory: e.target.value })} value={filters.subCategory}>
                    <option value=""> {t('Category...', { lng: languageReducer.language })}</option>
                    {Object.keys({ Vente: [], Location: [], Location_Vacances: [], Echange: [], Cherche_Achat: [], Cherche_Location: [] }).map(cat => (
                        <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
                    ))}
                </select>

            <div>
                <SearchComponent filters={filters} setFilters={setFilters} />
                <PriceRangeFilter filters={filters} setFilters={setFilters} />
            </div>

            <div className="modal-buttons">
                <button className="reset-btn" onClick={handleSearch}>Buscar</button>
                <button className="reset-btn" onClick={handleResetFilters}>
                    <span> ↻  </span>
                </button>
                <button className="reset-btn" onClick={handleCloseModal}>Cerrar</button>
            </div>
        </div>
    </div>
    );
};



export default ModalBusquedaAvanzada;