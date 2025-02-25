import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {   GLOBALTYPES } from '../../../redux/actions/globalTypes';
import { deletePost } from '../../../redux/actions/postAction';
import { BASE_URL } from '../../../utils/config';
import { aprovarPostPendiente } from '../../../redux/actions/postAproveAction';
import { useTranslation } from 'react-i18next';

import { useLocation } from "react-router-dom";
//import FollowBtn from '../../FollowBtn'; <FollowBtn user={user}/>  
 
 
const CardHeader = ({ post}) => {
    
    const { auth, socket,languageReducer } = useSelector(state => state);
 
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { t } = useTranslation();
    const handleAprovePost = () => {
        if (window.confirm("¿Deseas aprobar este post?")) {
            dispatch(aprovarPostPendiente({ post, auth }));
            history.push("/homepostspendientes");
        }
    };

    const handleEditPost = () => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
    };

    const handleDeletePost = () => {
        if (window.confirm("Are you sure want to delete this post?")) {
            dispatch(deletePost({ post, auth, socket, t, languageReducer}));
            return history.push("/");
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
    };

    return (
        <div className="card_header">
            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>

                <div className="dropdown-menu">
                    {auth.user ? (
                        auth.user._id === post.user._id || auth.user.role === "admin" ? (
                            // 📌 Si el usuario es dueño del post, muestra estas opciones
                            <>
                            {location.pathname !== "/" && (
                            <div className="dropdown-item" onClick={handleAprovePost}>
                                <span className="material-icons">check</span> Aprobar Post
                            </div>
                        )}
                            <div className="dropdown-item" onClick={handleEditPost}>
                                <span className="material-icons">edit</span> Editar Post
                            </div>
                           
                            <div className="dropdown-item" onClick={handleDeletePost}>
                                <span className="material-icons">edit</span> eliminar post
                            </div>
                           

                                         </>
                ) : (
                // 📌 Si el usuario está autenticado pero no es dueño del post
                <>
                     
                    
                    <div className="dropdown-item">
                        <span className="material-icons">       </span> Activar Notificaciones
                    </div>
                    <div className="dropdown-item">
                        <span className="material-icons">report</span> Denunciar Post
                    </div>
                  
                </>
                )
                ) : (
                // 📌 Si el usuario NO está autenticado
                <>
                    <div className="dropdown-item">
                        <span className="material-icons">search</span> Buscar Posts
                    </div>
                    <div className="dropdown-item">
                        <span className="material-icons">share</span> Compartir Post
                    </div>
                    <div className="dropdown-item">
                        <span className="material-icons">filter_list</span> Filtrar por Categoría
                    </div>
                   
              
                
                </>
                    )}

                <div className="dropdown-item" onClick={handleCopyLink}>
                    <span className="material-icons">content_copy</span> Copiar Enlace
                </div>
            </div>
        </div>
        </div >
    );
};

export default CardHeader;

