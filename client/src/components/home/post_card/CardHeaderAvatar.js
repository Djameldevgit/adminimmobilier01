import React from 'react'
import Avatar from '../../Avatar'
import { Link  } from 'react-router-dom'
 

const CardHeaderAvatar = ({post}) => {
    
  
    return (
        <div className="card_header">
            <div className="d-flex">
                <Avatar src={post.user.avatar} size="big-avatar" />

                <div className="card_name">
                    <h6 className="m-0">
                        <Link to={`/profile/${post.user._id}`} className="text-dark">
                            {post.user.username}
                        </Link>
                    </h6>
                    
                </div>
            </div>

            
        </div>
    )
}

export default CardHeaderAvatar
