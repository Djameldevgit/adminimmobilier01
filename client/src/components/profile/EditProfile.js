import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkImage } from '../../utils/imageUpload'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { updateProfileUser } from '../../redux/actions/profileAction'
import { useTranslation } from 'react-i18next'
const EditProfile = ({setOnEdit}) => {
    const { languageReducer } = useSelector(state => state)
    const { t } = useTranslation()

    const initState = {
       username:'',  mobile: '', address: '', website: '', story: '' 
    }
    const [userData, setUserData] = useState(initState)
    const { username, mobile, address, website, story  } = userData

    const [avatar, setAvatar] = useState('')

    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(auth.user)
    }, [auth.user])


    const changeAvatar = (e) => {
        const file = e.target.files[0]

        const err = checkImage(file)
        if(err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: {error: err}
        })

        setAvatar(file)
    }

    const handleInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]:value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(updateProfileUser({userData, avatar, auth}))
    }

    return (
        <div className="edit_profile">
            <button className="btn btn-danger btn_close"
            onClick={() => setOnEdit(false)}>
               {t('Close', { lng: languageReducer.language })}
            </button>

            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} 
                    alt="avatar" style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
                    <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input type="file" name="file" id="file_up"
                        accept="image/*" onChange={changeAvatar} />
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="fullname">{t('user name', { lng: languageReducer.language })}</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="fullname"
                        name="username" value={username} onChange={handleInput} />
                        <small className="text-danger position-absolute"
                        style={{top: '50%', right: '5px', transform: 'translateY(-50%)'}}>
                            {username.length}/25
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">{t('Mobile', { lng: languageReducer.language })}</label>
                    <input type="text" name="mobile" value={mobile}
                    className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="address"> {t('Address', { lng: languageReducer.language })}</label>
                    <input type="text" name="address" value={address}
                    className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="website"> {t('Website', { lng: languageReducer.language })}</label>
                    <input type="text" name="website" value={website}
                    className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="story">{t('Story', { lng: languageReducer.language })}</label>
                    <textarea name="story" value={story} cols="30" rows="4"
                    className="form-control" onChange={handleInput} />

                    <small className="text-danger d-block text-right">
                        {story.length}/200
                    </small>
                </div>

                

                <button className="btn btn-info w-100" type="submit"> {t('Save', { lng: languageReducer.language })}</button>
            </form>
        </div>
    )
}

export default EditProfile
