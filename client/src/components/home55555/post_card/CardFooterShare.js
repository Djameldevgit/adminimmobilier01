import React, { useState } from 'react'
 
import Send from '../../../images/send.svg'
 
import { useSelector } from 'react-redux'
 
import ShareModal from '../../ShareModal'
import { BASE_URL } from '../../../utils/config'


const CardFooterShare = ({ post }) => {

    const [isShare, setIsShare] = useState(false)

    const {  theme } = useSelector(state => state)
     

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <img src={Send} alt="Send" onClick={() => setIsShare(!isShare)} />
                </div>
            </div>

            {
                isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme} />
            }
        </div>
    )
}

export default CardFooterShare