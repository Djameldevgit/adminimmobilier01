import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsByCategory } from "../../redux/actions/postAction";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import PostCard from "../PostCard";
import { useTranslation } from 'react-i18next';
const ChercheLocation = ({ filters }) => {
  const { homePosts, theme, languageReducer } = useSelector(state => state);

  const { t } = useTranslation()
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    await dispatch(fetchPostsByCategory("Cherche_Location"));
    setLoad(false);
  };

  useEffect(() => {
    if (!homePosts.categories?.Cherche_Location?.posts.length) {
      dispatch(fetchPostsByCategory("Cherche_Location"));
    }
  }, [dispatch, homePosts.categories?.Cherche_Location?.posts.length]);

  const ChercheLocation = homePosts.categories?.Cherche_Location || {
    posts: [],
    page: 1,
    result: 0,
  };

  if (filters.subCategory && filters.subCategory !== "Cherche_Location") {
    return null;
  }
  const filteredPosts = ChercheLocation.posts.filter((post) => {
    const postPrice = Number(post.price) || 0;
    const minPrice = Number(filters.minPrice) || 0;
    const maxPrice = Number(filters.maxPrice) || 2000000; // Valor máximo predeterminado

    return (
      (!filters.subCategory || post.subCategory.includes(filters.subCategory) || filters.minPrice || filters.maxPrice) &&
      (!filters.title || post.title.includes(filters.title)) &&
      (!filters.wilaya || post.wilaya.includes(filters.wilaya)) &&
      (!filters.commune || post.commune.includes(filters.commune)) &&
      postPrice >= minPrice && postPrice <= maxPrice // Filtro por rango de precios
    );
  });


  return (
    <div>
      <h6 className="info-contact-title mr-3" style={{
        display: 'flex',
        justifyContent: languageReducer.language === 'ar' ? 'right' : 'flex-start', // Alinea a la derecha si es árabe
        flexDirection: 'row', // Para alinear los hijos verticalmente
      }}>
        {t('Search result search location...', { lng: languageReducer.language })}
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
            {t('No search match filter looking for location...', { lng: languageReducer.language })}
          </h6>
        )}
        {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}
      </div>
      <LoadMoreBtn
        result={ChercheLocation.result}
        page={ChercheLocation.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default ChercheLocation;
