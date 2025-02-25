import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import UserCard from '../UserCard'
import LoadIcon from '../../images/loading.gif'

const Search = () => {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!search) return;

        try {
            setLoad(true)
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setUsers(res.data.users)
            setLoad(false)
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg }
            })
        }
    }

    const handleClose = () => {
        setSearch('')
        setUsers([])
    }

    return (
        <form 
            className="search_form" 
            onSubmit={handleSearch} 
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                padding: '10px', 
                border: '1px solid #ccc', 
                borderRadius: '5px', 
                width: '100%', 
                maxWidth: '500px', 
                margin: '0 auto',
                backgroundColor: '#f9f9f9',
            }}
        >
            <input 
                type="text" 
                name="search" 
                value={search} 
                id="search" 
                title="Enter to Search"
                onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
                style={{
                    width: '100%',
                    padding: '10px',
                    margin: '10px 0',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                    type="submit" 
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}
                >
                    Search
                </button>
                <button 
                    type="button"
                    onClick={handleClose}
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        backgroundColor: '#f44336',
                        color: 'white',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}
                >
                    Close
                </button>
            </div>

            {load && <img className="loading" src={LoadIcon} alt="loading" style={{ width: '30px', marginTop: '10px' }} />}

            <div 
                className="users" 
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    width: '100%',
                    maxHeight: '300px',
                    overflowY: 'auto',
                }}
            >
                {search && users.map(user => (
                    <UserCard
                        key={user._id}
                        user={user}
                        border="border"
                        handleClose={handleClose}
                    />
                ))}
            </div>
        </form>
    )
}

export default Search
