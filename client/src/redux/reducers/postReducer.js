import { POST_TYPES } from '../actions/postAction';
import { EditData, DeleteData } from '../actions/globalTypes';

const initialState = {
     
    loading: false,
    

    categories: {
        Vente: { posts: [], page: 1, result: 0 },
        Location: { posts: [], page: 1, result: 0 },
        Echange: { posts: [], page: 1, result: 0 },
        Location_Vacances: { posts: [], page: 1, result: 0 },
        Cherche_Achat: { posts: [], page: 1, result: 0 } ,
        Cherche_Location: { posts: [], page: 1, result: 0 }
    }
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_TYPES.LOADING_POST:
            return {
                ...state,
                loading: action.payload
            };

        case POST_TYPES.GET_POSTS:
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [action.payload.category]: {
                        ...state.categories[action.payload.category],
                        posts: [...state.categories[action.payload.category].posts, ...action.payload.posts],
                        page: action.payload.page,
                        result: action.payload.result
                    }
                }
            };

        case POST_TYPES.UPDATE_POST:
            if (!state.categories[action.payload.category]) return state;

            // 📌 Clonar el array de posts para asegurar que React detecte el cambio
            const updatedPosts = EditData([...state.categories[action.payload.category].posts], action.payload._id, action.payload);

            return {
                ...state,
                categories: {
                    ...state.categories,
                    [action.payload.category]: {
                        ...state.categories[action.payload.category],
                        posts: updatedPosts // Nueva referencia del array
                    }
                }
            };

        case POST_TYPES.DELETE_POST:
            if (!state.categories[action.payload.category]) return state;

            // 📌 También clonamos el array al eliminar un post
            const filteredPosts = DeleteData([...state.categories[action.payload.category].posts], action.payload._id);

            return {
                ...state,
                categories: {
                    ...state.categories,
                    [action.payload.category]: {
                        ...state.categories[action.payload.category],
                        posts: filteredPosts
                    }
                }
            };

        default:
            return state;
    }
};

export default postReducer;
