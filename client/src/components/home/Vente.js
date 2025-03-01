import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsByCategory } from "../../redux/actions/postAction";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import PostCard from "../PostCard";
import { useTranslation } from 'react-i18next';
const Vente = ({ filters }) => {
  const { homePosts, theme, languageReducer } = useSelector(state => state);
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    await dispatch(fetchPostsByCategory("Vente"));
    setLoad(false);
  };

  useEffect(() => {
    if (!homePosts.categories?.Vente?.posts.length) {
      dispatch(fetchPostsByCategory("Vente"));
    }
  }, [dispatch, homePosts.categories?.Vente?.posts.length]);

  if (filters.subCategory && filters.subCategory !== "Vente") {
    return null;
  }

  const ventasCategory = homePosts.categories?.Vente || {
    posts: [],
    page: 1,
    result: 0,
  };
  
  const filteredPosts = ventasCategory.posts.filter((post) => {
    const postPrice = Number(post.price) || 0;
    const minPrice = Number(filters.minPrice) || 0;
    const maxPrice = Number(filters.maxPrice) || 2000000;

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
        {t('Search results sales...', { lng: languageReducer.language })}
      </h6>


      <div className="post_thumb">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post._id} post={post} theme={theme} />
          ))
        ) : (
          <h3 className="info-contact-title mr-3" style={{
            display: 'flex',
            justifyContent: languageReducer.language === 'ar' ? 'right' : 'flex-start', // Alinea a la derecha si es árabe
            flexDirection: 'row', // Para alinear los hijos verticalmente
          }}>
            {t('There are no sales posts that match the filters...', { lng: languageReducer.language })}
          </h3>

        )}
        {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}
      </div>
      <div>
        <LoadMoreBtn
          result={ventasCategory.result}
          page={ventasCategory.page}
          load={load}
          handleLoadMore={handleLoadMore}
        />
      </div>

    </div>
  );
};

export default Vente;