import React, { useState, useEffect } from 'react'
 
import { useSelector, useDispatch } from 'react-redux'
import {  savePost, unSavePost } from '../../../redux/actions/postAction'
 

const CardFooterSave = ({post}) => {
     
    const { auth  } = useSelector(state => state)
    const dispatch = useDispatch()

    const [saved, setSaved] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)

     
    

    // Saved
    useEffect(() => {
        if(auth.user.saved.find(id => id === post._id)){
            setSaved(true)
        }else{
            setSaved(false)
        }
    },[auth.user.saved, post._id])

    const handleSavePost = async () => {
        if(saveLoad) return;
        
        setSaveLoad(true)
        await dispatch(savePost({post, auth}))
        setSaveLoad(false)
    }

    const handleUnSavePost = async () => {
        if(saveLoad) return;

        setSaveLoad(true)
        await dispatch(unSavePost({post, auth}))
        setSaveLoad(false)
    }

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
               
                {
                    saved 
                    ?  <i className="fas fa-bookmark text-info"
                    onClick={handleUnSavePost} />

                    :  <i className="far fa-bookmark"
                    onClick={handleSavePost} />
                }
               
            </div>
 
           
        </div>
    )
}

export default CardFooterSave
