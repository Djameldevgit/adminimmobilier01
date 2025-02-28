import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Searchheader = ({ handleOpenModal }) => {
    const { languageReducer } = useSelector(state => state);
    const { t } = useTranslation();

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 1rem',
                border: '1px solid #ddd',
                borderRadius: '25px',
                backgroundColor: '#f8f9fa',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                maxWidth: '400px', // Ancho máximo del campo de búsqueda
                margin: '0 auto', // Centrar el campo de búsqueda
            }}
            onClick={handleOpenModal} // Usa handleOpenModal directamente
        >
            {/* Icono de búsqueda */}
            <span
                style={{
                    fontSize: '1.1rem',
                    color: '#007bff',
                    marginRight: '0.5rem',
                }}
            >
                <i className='fas fa-search'></i>
            </span>

            {/* Texto del placeholder */}
            <span
                style={{
                    fontSize: '1rem',
                    color: '#6c757d',
                    flex: 1, // Ocupar el espacio restante
                    display: 'flex',
                    justifyContent: languageReducer.language === 'ar' ? 'right' : 'flex-start', // Alinea a la derecha si es árabe
                    flexDirection: 'row', // Para alinear los hijos verticalmente
                }}
            >
                {t('Advanced search...', { lng: languageReducer.language })}
            </span>


            
        </div>
    );
};

export default Searchheader;