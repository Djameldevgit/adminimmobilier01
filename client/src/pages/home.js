import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import ChercheAchat from '../components/home/ChercheAchat';
import Location from '../components/home/Location';
import LocationVacances from '../components/home/LocationVacances';
import Vente from '../components/home/Vente';
import ChercheLocation from '../components/home/ChercheLocation';
import SearchComponent from '../components/SearchComponent';
import PriceRangeFilter from '../components/ranges/PriceRangeFilter';
import Echange from '../components/home/Echange';
import RangoHabitaciones from '../components/ranges/RangoHabitaciones';
import RangoSuperficie from '../components/ranges/RangoSuperficie';
import { Link } from 'react-router-dom';

import $ from 'jquery';

import Avatar from '../components/Avatar';

import { logout } from '../redux/actions/authAction';

import { GLOBALTYPES } from '../redux/actions/globalTypes';

let scroll = 0;

const Home = ({ showModal, setShowModal }) => {
    const { auth, notify } = useSelector((state) => state);
    const { homePosts } = useSelector(state => state);


    const [filters, setFilters] = useState({
        subCategory: "",
        title: "",
        customInput: "",
        wilaya: "",
        commune: "",
        roomRange: [1, 10],  // Número de habitaciones (min, max)
        surfaceRange: [20, 1000], // Superficie en m² (min, max)
        priceRange: [50000, 10000000] // Precio en moneda local (min, max)
    });
    const [appliedFilters, setAppliedFilters] = useState({
        subCategory: "",
        title: "",
        wilaya: "",
        commune: "",
        roomRange: [1, 10],
        surfaceRange: [20, 1000],
        priceRange: [50000, 10000000]
    });

    const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
    const handleSearch = () => { setAppliedFilters({ ...filters }); setShowModal(false); };
    const handleResetFilters = () => {
        setFilters({
            subCategory: "",
            title: "",
            wilaya: "",
            commune: "",
            roomRange: [1, 10],
            surfaceRange: [20, 1000],
            priceRange: [50000, 10000000]
        });
        setAppliedFilters({
            subCategory: "",
            title: "",
            wilaya: "",
            commune: "",
            roomRange: [1, 10],
            surfaceRange: [20, 1000],
            priceRange: [50000, 10000000]
        });
    };
    const dispatch = useDispatch()
    const avatarSrc = auth?.user?.avatar;
    const username = auth?.user?.username;

    window.addEventListener('scroll', () => {
        if (window.location.pathname === '/') {
            scroll = window.pageYOffset
            return scroll;
        }
    })

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: scroll, behavior: 'smooth' })
        }, 100)
    }, [])
    useEffect(() => {
        // Asegurarse de que el sidebar esté cerrado por defecto
        document.querySelector(".page-wrapper").classList.remove("toggled");

        const handleSidebarClick = () => {
            document.querySelector(".page-wrapper").classList.remove("toggled");
        };

        const handleDropdownClick = (e) => {
            const dropdown = e.currentTarget;
            const submenu = dropdown.nextElementSibling;

            // Verificamos si el submenu existe
            if (!submenu) {
                console.error("El submenu no existe.");
                return;
            }

            if (dropdown.parentElement.classList.contains("active")) {
                dropdown.parentElement.classList.remove("active");
                submenu.style.display = "none";
            } else {
                document.querySelectorAll(".sidebar-dropdown").forEach(d => {
                    const sibling = d.nextElementSibling;
                    if (sibling) { // Verificamos si el hermano existe
                        d.classList.remove("active");
                        sibling.style.display = "none";
                    }
                });
                dropdown.parentElement.classList.add("active");
                submenu.style.display = "block";
            }
        };

        const showSidebar = () => {
            document.querySelector(".page-wrapper").classList.add("toggled");
        };

        const closeSidebarButtons = document.querySelectorAll("#close-sidebar, #close-sidebar2");
        const showSidebarButtons = document.querySelectorAll("#show-sidebar, #show-sidebar2");
        const dropdownLinks = document.querySelectorAll(".sidebar-dropdown > a");

        closeSidebarButtons.forEach(button => button.addEventListener("click", handleSidebarClick));
        showSidebarButtons.forEach(button => button.addEventListener("click", showSidebar));
        dropdownLinks.forEach(link => link.addEventListener("click", handleDropdownClick));

        return () => {
            closeSidebarButtons.forEach(button => button.removeEventListener("click", handleSidebarClick));
            showSidebarButtons.forEach(button => button.removeEventListener("click", showSidebar));
            dropdownLinks.forEach(link => link.removeEventListener("click", handleDropdownClick));
        };
    }, []);

    const handleButtonClick = () => {
        dispatch({ type: GLOBALTYPES.STATUSSEARCH, payload: true });
    };

    return (
        <div className="page-wrapper chiller-theme toggled">
            <Link id="show-sidebar2" className="btn btn-sm btn-dark" href="#">
                <i className="fas fa-bars" />
            </Link>
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="sidebar-content">
                    <div className="sidebar-brand">
                        <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                            <i className="fas fa-user-cog" style={{ fontSize: '24px', marginRight: '10px' }}></i>
                            <span style={{ fontSize: '16px' }}>Tassili Web</span>
                        </Link>
                        <div id="close-sidebar">
                            <i className="fas fa-times" />
                        </div>



                    </div>
                    <div className="sidebar-header">
                        <div className="user-pic">
                            <div className="user-pic" style={{ marginRight: '10px' }}>
                                {avatarSrc && <Avatar src={avatarSrc} className="img-responsive img-rounded" />}
                            </div>
                        </div>

                    </div>


                    <div className="sidebar-search" id="close-sidebar2" onClick={() => $(".page-wrapper").removeClass("toggled")}>
                        <div>
                            <div className="input-group">
                                <input type="text" className="form-control search-menu" placeholder='Recherche avancée' onClick={handleButtonClick} />
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <i className="fa fa-search" aria-hidden="true" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="sidebar-menu">
                        <ul>
                            <li className="header-menu">
                                <span>Mon compte</span>
                            </li>

                            {/* Opciones para usuarios no autenticados */}
                            {!auth.user && (
                                <>
                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/login">
                                            <i className="fa fa-sign-in-alt text-green" />
                                            <span>Se connecter</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/register">
                                            <i className="fa fa-user-plus text-warning" />
                                            <span>S'inscrire</span>
                                        </Link>
                                    </li>
                                </>
                            )}

                            {/* Opciones para usuarios autenticados */}
                            {auth.user && (
                                <>
                                    <li className="sidebar-dropdown">
                                        <Link onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })} className="dropdown-item" to="/pages/categoriaslista/cervices">
                                            <i className="fas fa-plus-circle"></i>
                                            <span>Ajouter Annonce</span>
                                        </Link>
                                    </li>


                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/notificacionesusuario">
                                            <i className="fas fa-bell"></i>
                                            <span>Notifications</span>
                                            <span className="badge badge-pill badge-danger">{notify.data.length}</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
                                            <i className="fas fa-user"></i>
                                            <span>Profil</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-dropdown">
                                        <Link
                                            className="dropdown-item"
                                            to="/"
                                            onClick={() => dispatch(logout())}
                                        >
                                            <i className="fas fa-power-off" style={{ color: 'red' }}></i>
                                            Se déconnecter
                                        </Link>
                                    </li>
                                </>
                            )}


                            {auth.user?.role === "admin" && (
                                <>
                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/categoriaslista/cervices">
                                            <i className="fas fa-plus-circle"></i>
                                            <span>Ajouter Annonce</span>
                                        </Link>
                                    </li>


                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/administracion/postspendientes">
                                            <i className="fa fa-plus-circle" />
                                            <span>Aprouve posts</span>
                                        </Link>
                                    </li>

                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/users/usersposts">
                                            <i className="fa fa-plus-circle" />
                                            <span>Liste Utilizateurs</span>
                                        </Link>
                                    </li>

                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/roles/userrole">
                                            <i className="fa fa-plus-circle" />
                                            <span>Liste Roles</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/bloqueos/blockposts">
                                            <i className="fa fa-plus-circle" />
                                            <span>Block post</span>
                                        </Link>
                                    </li>

                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to={`/pages/profile/${auth.user._id}`}>
                                            <i className="fa fa-user" />
                                            <span>Profil</span>
                                        </Link>
                                    </li>




                                    <li className="sidebar-dropdown">
                                        <Link
                                            className="dropdown-item"
                                            to="/"
                                            onClick={() => dispatch(logout())}
                                        >
                                            <i className="fas fa-power-off" style={{ color: 'red' }}></i>
                                            Se déconnecter
                                        </Link>
                                    </li>
                                    <li className="header-menu">
                                        <span>Catégories</span>
                                    </li>
                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/salasfiestas">
                                            <i className="fas fa-gem"></i>
                                            <span>immobilier</span>
                                        </Link>
                                    </li>

                                </>








                            )}


                        </ul>
                    </div>
                </div>
            </nav>

            <div className='home'>



                <div className="home-container">
                    <Vente filters={appliedFilters} />
                    <Location filters={appliedFilters} />
                    <Echange filters={appliedFilters} />
                    <LocationVacances filters={appliedFilters} />
                    <ChercheAchat filters={appliedFilters} />
                    <ChercheLocation filters={appliedFilters} />

                    {showModal && (
                        <div className="modal-busqueda">
                            <div className="modal-content-busqueda">
                                <button className="close-icon" onClick={() => setShowModal(false)}>
                                    &times;
                                </button>
                                <h5 className='text-center' >Recherche par spécification</h5>
                                <select className='select-busqueda' name="subCategory" onChange={handleChange} value={filters.subCategory}>
                                    <option value="">Sélectionnez la Catégorie</option>
                                    {Object.keys({ Vente: [], Location: [], Location_Vacances: [], Echange: [], Cherche_Achat: [], Cherche_Location: [] }).map(cat => (
                                        <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
                                    ))}
                                </select>
                                <div>
                                    <select style={{ display: "flex", alignItems: "flex-end" }}
                                        name="title" value={filters.title} onChange={handleChange}
                                        className="form-control" required >  <option value="">Titre</option>
                                        <option value="Appartement">Appartement</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Local">Local</option>
                                        <option value="Terrain">Terrain</option>
                                        <option value="Carcasse">Carcasse</option>
                                        <option value="Niveau de villa">Niveau de Villa</option>
                                        <option value="Terrain Agricole">Terrain Agricole</option>
                                        <option value="Immeuble">Immeuble</option>
                                        <option value="Duplex">Duplex</option>
                                        <option value="Studio">Studio</option>
                                        <option value="Hangar">Hangar</option>
                                        <option value="Bungalow">Bungalow</option>
                                        <option value="Usine">Usine</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                    <small className='text-danger'>Ce champ est requis</small>
                                </div>

                                {filters.title === "Appartement" && (
                                    <div>
                                        <RangoHabitaciones filters={filters} setFilters={setFilters} />
                                        <RangoSuperficie filters={filters} setFilters={setFilters} />


                                    </div>

                                )}


                                {["Villa", "Niveau de Villa"].includes(filters.title) && (
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Nombre d’appartements"
                                            name="customInput"
                                            value={filters.customInput}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Superficie en M²"
                                            name="customInput"
                                            value={filters.customInput}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}


                                {["Terrain", "Carcasse", "Local"].includes(filters.title) && (
                                    <input
                                        type="number"
                                        placeholder="Superficie en m²"
                                        name="customInput"
                                        value={filters.customInput}
                                        onChange={handleChange}
                                    />
                                )}

                                {filters.title === "Immeuble" && (
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Décrivez le bien"
                                            name="customInput"
                                            value={filters.customInput}
                                            onChange={handleChange}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Superficie en m²"
                                            name="customInput"
                                            value={filters.customInput}
                                            onChange={handleChange}
                                        />

                                    </div>

                                )}





                                <SearchComponent filters={filters} setFilters={setFilters} />
                                <PriceRangeFilter filters={filters} setFilters={setFilters} />

                                <div className="modal-buttons">
                                    <button className="search-btn" onClick={handleSearch}>Buscar</button>
                                    <button className="reset-btn" onClick={handleResetFilters}>Restaurar Categorías</button>
                                    <button className="close-btn" onClick={() => setShowModal(false)}>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {homePosts.loading && <p>Cargando...</p>}
                </div>


            </div>
        </div>


    );
}

export default Home;
