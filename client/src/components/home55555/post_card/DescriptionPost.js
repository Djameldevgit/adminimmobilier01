import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
 
const DescriptionPost = ({ post }) => {
    const { languageReducer } = useSelector(state => state);
    const { t } = useTranslation();

    const language = languageReducer.language || "en";
    const isRTL = language === "ar"; // Verifica si el idioma es RTL (ej. árabe)

    return (
        <div className={`description-container ${isRTL ? 'rtl' : ''}`}>
            <div className="post-info">
                <div className="info-item">
                    <i className="fas fa-comment"></i>
                    <span className="info-label">Wilaya:</span>
                    <span className="info-value">{post.wilaya || t("notSpecified", { lng: language })}</span>
                </div>
                <div className="info-item">
                    <i className="fas fa-thumbs-up"></i>
                    <span className="info-label">Commune:</span>
                    <span className="info-value">{post.commune || t("notSpecified", { lng: language })}</span>
                </div>
                <div className="info-item">
                    <i className="fas fa-comment"></i>
                    <span className="info-label">{t("comments", { lng: language })}:</span>
                    <span className="info-value">{post.comments.length || t("notSpecified", { lng: language })}</span>
                </div>
                <div className="info-item">
                    <i className="fas fa-thumbs-up"></i>
                    <span className="info-label">{t("likes", { lng: language })}:</span>
                    <span className="info-value">{post.likes.length || t("notSpecified", { lng: language })}</span>
                </div>
                <div className="info-item">
                    <i className="fas fa-map"></i>
                    <span className="info-label">{t("location", { lng: language })}:</span>
                    <span className="info-value">{post.commune || t("notSpecified", { lng: language })}</span>
                </div>
                <div className="info-item">
                    <i className="fas fa-envelope"></i>
                    <span className="info-label">{t("email", { lng: language })}:</span>
                    <span className="info-value">{post.email || t("notSpecified", { lng: language })}</span>
                </div>
                <div className="info-item">
                    <i className="fas fa-user-circle"></i>
                    <span className="info-label">{t("seller", { lng: language })}:</span>
                    <span className="info-value">{post.informacion || t("notSpecified", { lng: language })}</span>
                </div>
                <div className="info-item">
                    <i className="fas fa-comments"></i>
                    <span className="info-label">{t("allowComments", { lng: language })}:</span>
                    <span className="info-value">{post.comentarios || t("notSpecified", { lng: language })}</span>
                </div>
                <div className="info-item">
                    <i className="fas fa-eye"></i>
                    <span className="info-label">{t("views", { lng: language })}:</span>
                    <span className="info-value">{post.contadordevisitas || t("notSpecified", { lng: language })}</span>
                </div>
                <div className="info-item">
                    <i className="fas fa-clock"></i>
                    <span className="info-label">{t("adDuration", { lng: language })}:</span>
                    <span className="info-value">{post.duraciondelanuncio || t("notSpecified", { lng: language })}</span>
                </div>
            </div>
        </div>
    );
};

export default DescriptionPost;