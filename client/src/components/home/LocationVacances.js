import React, { useState ,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostsByCategory } from '../../redux/actions/postAction';
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
//import LoadIcon from '../images/loading.gif';
import PostCard from '../PostCard';
 
const LocationVacances  = ({ filters }) => {
  const { homePosts, theme } = useSelector(state => state);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    const handleLoadMore = async () => {
        setLoad(true);
        await dispatch(fetchPostsByCategory("Location_Vacances"));
        setLoad(false);
    };

    const locationVacances = homePosts.categories?.Location_Vacances || { posts: [], page: 1, result: 0 };

    const filteredPosts = locationVacances.posts.filter((post) => {
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
    useEffect(() => {
        if (locationVacances.posts.length === 0) {
            dispatch(fetchPostsByCategory("Location_Vacances"));
        }
    }, [dispatch, locationVacances.posts]);
    return (
        <div>
            <h2>Location vacances</h2>

            <div className="post_thumb">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <PostCard key={post._id} post={post} theme={theme} />
                    ))
                ) : (
                    <p>No hay publicaciones de location vacances que coincidan con los filtros.</p>
                )}

                {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}
            </div>

            <LoadMoreBtn 
                result={locationVacances.result} 
                page={locationVacances.page}
                load={load} 
                handleLoadMore={handleLoadMore} 
            />
        </div>
    );
};
export default LocationVacances 