import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsByCategory } from "../../redux/actions/postAction";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import PostCard from "../PostCard";

const ChercheLocation = ({ filters }) => {
  const { homePosts, theme } = useSelector((state) => state);
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

  // 🏷️ Filtrado avanzado con precios (minPrice, maxPrice)
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
      <h2>Cherche location</h2>
      <div className="post_thumb">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} theme={theme} />
          ))
        ) : (
          <p>No hay publicaciones de cherche location que coincidan con los filtros.</p>
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
