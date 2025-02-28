import React from 'react'
 
import {  useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import 'moment/locale/fr'; // Importa el idioma francés

const CardHeaderMoment = () => {
    moment.locale('fr'); // Establece el idioma a francés

   
    return (
        <div className="card_header">
            <div className="d-flex">
               
                <div className="card_name">
                 
                    <small className="text-dat">
                        {moment(post.createdAt).fromNow()}
                    </small>
                </div>
            </div>
 
        </div>
    )
}

export default CardHeaderMoment
