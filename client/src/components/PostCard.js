import React from 'react';
//import CardHeader from './home/post_card/CardHeader';
import CardBodyCarousel from './home/post_card/CardBodyCarousel';
import InputComment from './home/InputComment';
import CardFooterCommentLikes from './home/post_card/CardFooterCommentLikes';
import Comments from './home/Comments';
 
import DescriptionPost from './home/post_card/DescriptionPost';
import InformationUserPost from './home/post_card/InformationUserPost';
import { useLocation } from "react-router-dom";
import CardBodyTitle from './home/post_card/CardBodyTitle';
import { useSelector } from 'react-redux';
import ProductDetail from './home/post_card/ProductDetail';

const PostCard = ({ post }) => {
    const location = useLocation();
    const isPostDetailPage = location.pathname.startsWith(`/post/${post._id}`); // 🔹 Ajusté la ruta a "/posts/"
    const { auth } = useSelector(state => state); // 🔹 Obtiene la autenticación desde Redux

    const isAuthenticated = auth.token ? true : false; // 🔹 Verifica si el usuario está autenticado

    return (
        <div className="card my-3">
            <CardBodyTitle post={post} />
            <CardBodyCarousel post={post} />
             <CardFooterCommentLikes post={post} /> 
            
            {isPostDetailPage &&   <ProductDetail post={post} />}
           
            {isPostDetailPage && <DescriptionPost post={post} />}
            
            {isAuthenticated && isPostDetailPage && (
                <>
                
                   
                    <InformationUserPost post={post} />
                    <Comments post={post} />
                    <InputComment post={post} />
                </>
            )}
        </div>
    );
};

export default PostCard;
