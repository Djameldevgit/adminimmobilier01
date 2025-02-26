import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ChercheAchat from '../components/home/ChercheAchat';
import Location from '../components/home/Location';
import LocationVacances from '../components/home/LocationVacances';
import Vente from '../components/home/Vente';
import ChercheLocation from '../components/home/ChercheLocation';
import Echange from '../components/home/Echange';
import ModalBusquedaAvanzada from '../components/ModalBusquedaAvanzada';
import Searchheader from '../components/header/Searchheader';

const Home = () => {
    const { homePosts } = useSelector(state => state);
    const [showModal, setShowModal] = useState(false);
    const [filters, setFilters] = useState({ subCategory: "", title: "", wilaya: "", commune: "" });
    const [appliedFilters, setAppliedFilters] = useState({ subCategory: "", title: "", wilaya: "", commune: "" });

    //const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
    const handleOpenModal = () => setShowModal(true); // Función para abrir el modal
    const handleCloseModal = () => setShowModal(false);
    const handleSearch = () => { setAppliedFilters({ ...filters }); setShowModal(false); };
    const handleResetFilters = () => { setFilters({ subCategory: "", title: "", wilaya: "", commune: "" }); setAppliedFilters({ subCategory: "", title: "", wilaya: "", commune: "" }); };

    return (
        <div className="home-container">
            {/* Pasa handleOpenModal como una prop llamada handleOpenModal */}
            <Searchheader handleOpenModal={handleOpenModal} />

            <Vente filters={appliedFilters} />
            <Location filters={appliedFilters} />
            <Echange filters={appliedFilters} />
            <LocationVacances filters={appliedFilters} />
            <ChercheAchat filters={appliedFilters} />
            <ChercheLocation filters={appliedFilters} />

            {/* Modal de búsqueda avanzada */}
            <ModalBusquedaAvanzada
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                filters={filters}
                setFilters={setFilters}
                handleSearch={handleSearch}
                handleResetFilters={handleResetFilters}
            />

            {homePosts.loading && <p>Cargando...</p>}
        </div>
    );
};

export default Home;