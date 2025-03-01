import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
//{t("details", { lng: language })}

const ProductDetail = ({ post }) => {

    const { languageReducer } = useSelector(state => state);
    const { t } = useTranslation();

    const language = languageReducer.language || "en";

    return (
        <div className="product-details">

            <div className="details-container">
                <div className="info-item">
                    <span className="info-label">Immobilier: {post.subCategory}</span>
                    <span className="info-value">
                        {post.title}
                        {(String(post.title).trim().toLowerCase() === "villa" || String(post.title).trim().toLowerCase() === "appartement") && "F"} {/* Muestra "F" solo si es "Villa" o "Appartement" */}
                        {post.attributes.piece}
                    </span>
                </div>
                <div className="info-item">
                    <span className="info-label">  {post.subCategory}</span>
                    <span className="info-value">
                        {post.title}
                        {(String(post.title).trim().toLowerCase() === "Immeuble" )  } {/* Muestra "F" solo si es "Villa" o "Appartement" */}
                        {post.attributes.numerodeapartamientos} Appartements
                    </span>
                </div>
                <div className="info-item">
                    <span className="info-label">Publié le: </span>
                    <span className="info-value">{new Date(post.createdAt).toLocaleDateString()} a las {new Date(post.createdAt).toLocaleTimeString()}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Actualise le: </span>
                    <span className="info-value">    {new Date(post.updatedAt).toLocaleDateString()} à {new Date(post.updatedAt).toLocaleTimeString()}
                    </span>
                </div>

               
                {(post.vistas || []).length > 0 && (
                    <div className="info-item">
                        <i className="fas fa-eye"></i>
                        <span className="info-label">Vue:</span>
                        <span className="info-value">{post.vistas}</span>
                    </div>
                )}

                {(post.likes || []).length > 0 && (
                    <div className="info-item">
                        <span className="info-label">Likes: </span>
                        <span className="info-value">{post.likes.length}</span>
                    </div>
                )}



                {(post.comments || []).length > 0 && (
                    <div className="info-item">
                        <i className="fas fa-comments"></i>
                        <span className="info-label">Commentaires:</span>
                        <span className="info-value">{(post.comments || []).length}</span>
                    </div>
                )}
                {post.attributes.comentarios && (
                    <div className="info-item">
                        <i className="fas fa-comments"></i>
                        <span className="info-label">{t("allowComments", { lng: language })}:</span>
                        <span className="info-value">{post.comentarios || t("notSpecified", { lng: language })}</span>
                    </div>
                )}

                
                {post.attributes.surface && (
                    <div className="info-item">
                        <span className="info-label">Superficie:</span>
                        <span className="info-value">{post.attributes.surface} M²</span>
                    </div>
                )}
                {post.attributes.etage && (
                    <div className="info-item">
                        <span className="info-label">Etage(s):</span>
                        <span className="info-value">{post.attributes.etage}</span>
                    </div>
                )}
                {post.attributes.piece && (
                    <div className="info-item">
                        <span className="info-label">Pièces:</span>
                        <span className="info-value">{post.attributes.piece}</span>
                    </div>
                )}

                {post.attributes.promoteurimmobilier && (
                    <div className="info-item">
                        <span className="info-label">Promotion immobilière:</span>
                        <span className="info-value">{post.attributes.promoteurimmobilier}</span>
                    </div>
                )}
                {post.attributes.parlepromoteurimmobilier && (
                    <div className="info-item">
                        <span className="info-label">Parle du promoteur immobilier:</span>
                        <span className="info-value">{post.attributes.parlepromoteurimmobilier}</span>
                    </div>
                )}
                {post.attributes.conditiondepeyement && post.attributes.conditiondepeyement.length > 0 && (
                    <div className="info-item">
                        <span className="info-label">Conditions de paiement:</span>
                        <span className="info-value">
                            {post.attributes.conditiondepeyement.join(", ")}
                        </span>
                    </div>
                )}

                {post.attributes.specifications && post.attributes.specifications.length > 0 && (
                    <div className="info-item">
                        <span className="info-label">Spécifications:</span>
                        <span className="info-value">
                            {post.attributes.specifications.join(", ")}
                        </span>
                    </div>
                )}
                {post.attributes.papiers && post.attributes.papiers.length > 0 && (
                    <div className="info-item">
                        <span className="info-label">Papiers:</span>
                        <span className="info-value">
                            {post.attributes.papiers.join(", ")}
                        </span>
                    </div>
                )}


            </div>
        </div>
    );
};


export default ProductDetail


