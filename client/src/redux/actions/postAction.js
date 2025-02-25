import { GLOBALTYPES } from './globalTypes'
//import { imageUpload } from '../../utils/imageUpload'
import { getDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { createNotify, removeNotify } from './notifyAction'
 
 
export const POST_TYPES = {
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST'
}


 
 export const getPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
 
        const res = token ? await getDataAPI('posts', token) : await getDataAPI('posts');

        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: { ...res.data, page: 2 },
        });

        dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response?.data?.msg || "Error al cargar los posts" },
        });
    }
}; 
export const fetchPostsByCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true });

        const { auth, homePosts } = getState();
        const res = await getDataAPI(`posts?subCategory=${category}&limit=${homePosts.categories[category].page * 4}`, auth.token);

        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: {
                category,
                posts: res.data.posts,
                page: homePosts.categories[category].page + 1,
                result: res.data.result
            }
        });

        dispatch({ type: POST_TYPES.LOADING_POST, payload: false });

    } catch (err) {
        console.log(err);
        dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    }
};

 

export const getLocationPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true });

        const res = token
            ? await getDataAPI('posts?subCategory=Location', token)
            : await getDataAPI('posts?subCategory=Location');

        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: { ...res.data, page: 2 },
        });

        dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response?.data?.msg || "Error al cargar los posts de Ventas" },
        });
    }
};
export const getVentasPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true });

        const res = token
            ? await getDataAPI('posts?subCategory=Vente', token)
            : await getDataAPI('posts?subCategory=Vente');

        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: { ...res.data, page: 2 },
        });

        dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response?.data?.msg || "Error al cargar los posts de Ventas" },
        });
    }
};


 
    
    





export const likePost = ({ post, auth, socket, t, languageReducer }) => async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] }//Aquí, newPost es una copia de la publicación original (post), pero con el usuario actual (auth.user) agregado al array de likes.
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    socket.emit('likePost', newPost)//Esta línea utiliza Socket.IO para emitir un evento (likePost) al servidor.
    //El evento lleva como dato (payload) la nueva versión de la publicación (newPost), que incluye el "like" recién agregado
    //Sin esta línea, otros usuarios no verían el "like" hasta que recarguen la página o realicen una nueva
    try {
        await patchDataAPI(`post/${post._id}/like`, null, auth.token)

        // Notify
        const msg = {
            id: auth.user._id,
            text: t('he liked your message', { lng: languageReducer.language }),
            recipients: [post.user._id],
            url: `/post/${post._id}`,
            title: post.title,
            image: post.images[0].url
        }

        dispatch(createNotify({ msg, auth, socket }))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const unLikePost = ({ post, auth, socket, t, languageReducer }) => async (dispatch) => {
  

    const newPost = { ...post, likes: post.likes.filter(like => like._id !== auth.user._id) }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    socket.emit('unLikePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/unlike`, null, auth.token)

        // Notify
        const msg = {
            id: auth.user._id,
            text: t('he liked your message', { lng: languageReducer.language }),
            recipients: [post.user._id],
            url: `/post/${post._id}`,
        }
        dispatch(removeNotify({ msg, auth, socket }))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const getPost = ({ detailPost, id }) => async (dispatch) => {
    
    if (detailPost.every(post => post._id !== id)) {
        try {
            const res = await getDataAPI(`post/${id}`)
            dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post })
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg }
            })
        }
    }
}

export const deletePost= ({ post, auth, socket, t, languageReducer }) => async (dispatch) => {
   
    dispatch({ type: POST_TYPES.DELETE_POST, payload: post })

    try {
        const res = await deleteDataAPI(`post/${post._id}`, auth.token)

        // Notify
        const msg = {
            id: post._id,  
            text: t('has deleted a post', { lng: languageReducer.language }),
            recipients: res.data.newPost.user.followers,
            url: `/post/${post._id}`,
        }
        dispatch(removeNotify({ msg, auth, socket }))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const savePost = ({ post, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] }
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })

    try {
        await patchDataAPI(`savePost/${post._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const unSavePost = ({ post, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, saved: auth.user.saved.filter(id => id !== post._id) }
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })

    try {
        await patchDataAPI(`unSavePost/${post._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}