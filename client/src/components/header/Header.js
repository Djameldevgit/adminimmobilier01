import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Header = ({ handleOpenModal }) => {
  const { languageReducer } = useSelector(state => state);
  const { t } = useTranslation();

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg justify-content-between align-middle">
        <Link to="/" className="logo">
          <h1 className="navbar-brand text-uppercase p-0 mt-2 ml-5" onClick={() => window.scrollTo({ top: 0 })}>
            {t('realestate', { lng: languageReducer.language })}
          </h1>
          <img src='icon-web-01.png' className='imagelogo' />
        </Link>
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
            maxWidth: '400px',
            margin: '0 auto',
          }}
          onClick={handleOpenModal}
        >
          <span style={{ fontSize: '1.1rem', color: '#007bff', marginRight: '0.5rem' }}>
            <i className='fas fa-search'></i>
          </span>
          <span style={{ fontSize: '1rem', color: '#6c757d', flex: 1, display: 'flex', justifyContent: languageReducer.language === 'ar' ? 'right' : 'flex-start', flexDirection: 'row' }}>
            {t('Advanced search...', { lng: languageReducer.language })}
          </span>
        </div>
        <Menu />
      </nav>
    </div>
  );
};

export default Header;