import React from 'react'

const LoadMoreBtn = ({result, page, load, handleLoadMore}) => {
    return (
        <>
            {
                result < 4 * (page - 1) ? '' : 

                !load && <button className="btn btn-dark mx-auto d-block"
                onClick={handleLoadMore}>
                    Voir Plus
                </button>
            }
            
        </>
    )
}

export default LoadMoreBtn
