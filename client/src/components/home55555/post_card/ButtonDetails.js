import React from 'react';
import { Link } from 'react-router-dom';
 
const ButtonDetails = ({ post }) => {
    return (
        <div className='visualizacion-button'>
            <Link to={`/post/${post._id}`} className="text-dark"  >
                <button className="details-button">
                    Ver Detalles
                </button>
            </Link>
        </div>
    );
};

export default ButtonDetails;
