import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';

const LoadMoreBtn = ({result, page, load, handleLoadMore}) => {
 
    const {languageReducer} = useSelector(state=>state)
    const { t } = useTranslation()
    return (
        <>
            {
                result < 4 * (page - 1) ? '' : 

                !load && <button className="btn btn-outline-secondary   mx-auto d-block mb-4"
                onClick={handleLoadMore}>
                   {t('See more articles', { lng: languageReducer.language })}  
                </button>

                
            }
            
        </>
    )
}

export default LoadMoreBtn
