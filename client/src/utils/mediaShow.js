import { GLOBALTYPES } from "../redux/actions/globalTypes"

 

export const imageShow = (src, theme) => {
    return(
        <img src={src} alt="images" className="img-thumbnail"
        style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
    )
}

export const videoShow = (src, theme) => {
    return(
        <video controls src={src} alt="images" className="img-thumbnail"
        style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
    )
}

 

 
 

export const handleChangeSelect = (selectedOptions, setPostData, field) => {
    setPostData(prevState => ({
        ...prevState,
        attributes: {
            ...prevState.attributes,
            [field]: selectedOptions ? selectedOptions.map(option => option.value) : []
        }
    }));
};

export const handleChangeInput = (e, setPostData) => {
    const { name, value, type, checked } = e.target;
    setPostData(prevState => {
        const isCheckbox = type === "checkbox";
        const isAttribute = prevState.attributes && Object.prototype.hasOwnProperty.call(prevState.attributes, name);
        return isAttribute ? {
            ...prevState,
            attributes: {
                ...prevState.attributes,
                [name]: isCheckbox ? checked : value
            }
        } : {
            ...prevState,
            [name]: isCheckbox ? checked : value
        };
    });
};

export const handleChangeImages = (e, images, setImages, dispatch) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach(file => {
        if (!file) return err = "File does not exist.";
        if (file.size > 1024 * 1024 * 5) return err = "The image/video largest is 5mb.";
        newImages.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
};

export const deleteImages = (index, images, setImages) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
};

export const handleSubmit = (e, postData, images, auth, socket, status, dispatch, setPostData, setImages, tracks, initilastate, crearPostPendiente, updatePost) => {
    e.preventDefault();
    if (images.length === 0) {
        return dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: "Por favor agrega una foto o video." },
        });
    }
    
    if (status.onEdit) {
        dispatch(updatePost({ postData, images, auth, status }));
    } else {
        dispatch(crearPostPendiente({ postData, images, auth, socket }));
    }
    
    setPostData(initilastate);
    setImages([]);
    if (tracks) tracks.stop();
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
};
