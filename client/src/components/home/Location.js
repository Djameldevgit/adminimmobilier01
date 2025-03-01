import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostsByCategory } from '../../redux/actions/postAction';
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { useTranslation } from 'react-i18next';
import PostCard from '../PostCard';

const Location = ({ filters }) => {
    const { homePosts, theme, languageReducer } = useSelector(state => state);
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const locationCategory = homePosts.categories?.Location || { posts: [], page: 1, result: 0 };


    const handleLoadMore = async () => {
        setLoad(true);
        await dispatch(fetchPostsByCategory("Location"));
        setLoad(false);
    };
    useEffect(() => {
        if (locationCategory.posts.length === 0) {
            dispatch(fetchPostsByCategory("Location"));
        }
    }, [dispatch, locationCategory.posts]);

    if (filters.subCategory && filters.subCategory !== "Location") {
        return null;
    }


    const filteredPosts = locationCategory.posts.filter((post) => {
        const postPrice = Number(post.price) || 0;
        const minPrice = Number(filters.minPrice) || 0;
        const maxPrice = Number(filters.maxPrice) || 2000000; // Valor máximo predeterminado
    
        // Acceder a los valores dentro de attributes
        const postSurface = Number(post.attributes?.surface) || 0; 
        const minSurface = Number(filters.minSurface) || 0;
        const maxSurface = Number(filters.maxSurface) || 1000; 
    
        const postRooms = Number(post.attributes?.piece) || 0;
        const minRooms = Number(filters.minRoom) || 0;
        const maxRooms = Number(filters.maxRoom) || 10; 
    
        return (
            (!filters.subCategory || post.subCategory.includes(filters.subCategory)) &&
            (!filters.title || post.title.includes(filters.title)) &&
            (!filters.wilaya || post.wilaya.includes(filters.wilaya)) &&
            (!filters.commune || post.commune.includes(filters.commune)) &&
            (postRooms >= minRooms && postRooms <= maxRooms) && // ✅ Filtro por número de habitaciones
            (postSurface >= minSurface && postSurface <= maxSurface) && // ✅ Filtro por superficie en m²
            (postPrice >= minPrice && postPrice <= maxPrice) // ✅ Filtro por rango de precios
        );
    });
    

    return (
        <div>
            <h6 className="info-contact-title mr-3" style={{
                display: 'flex',
                justifyContent: languageReducer.language === 'ar' ? 'right' : 'flex-start', // Alinea a la derecha si es árabe
                flexDirection: 'row', // Para alinear los hijos verticalmente
            }}>
                {t('Rental search result...', { lng: languageReducer.language })}
            </h6>
            <div className="post_thumb">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <PostCard key={post._id} post={post} theme={theme} />
                    ))
                ) : (
                    <h6 className="info-contact-title mr-3" style={{
                        display: 'flex',
                        justifyContent: languageReducer.language === 'ar' ? 'right' : 'flex-start', // Alinea a la derecha si es árabe
                        flexDirection: 'row', // Para alinear los hijos verticalmente
                    }}>
                        {t('There are no rental posts that match the filters...', { lng: languageReducer.language })}
                    </h6>
                )}
                {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}
            </div>
            <LoadMoreBtn
                result={locationCategory.result}
                page={locationCategory.page}
                load={load}
                handleLoadMore={handleLoadMore}
            />
        </div>
    );
};

export default Location;
