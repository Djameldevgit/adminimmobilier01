import React from "react";
import { useLocation } from "react-router-dom";
import CardHeader from "./CardHeader";

const CardBodyTitle = ({ post }) => {
    const location = useLocation();
    const isDetailPage = location.pathname === `/post/${post._id}`;

    return (
        <div className="cardtitle">
            <div className="card-header">
                {!isDetailPage && (
                    <div className="title-post">
                        <div className="title0">{post.subCategory}</div>
                        <div className="title2">{post.title}</div>
                        <div className="title3"> F {post.attributes.etage}</div>
                    </div>
                )}

                <div className="icon-edit">
                    <CardHeader post={post} />
                </div>

            </div>

            {!isDetailPage && (
            <div className="titlelocation">
                <div className="title4">{post.wilaya}</div>
                <div className="title4">{post.commune}</div>
            </div>
             )}

        </div>
    );
};

export default CardBodyTitle;




