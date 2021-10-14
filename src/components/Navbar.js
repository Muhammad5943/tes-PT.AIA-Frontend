import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'

const NavBar = () => {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    const renderList = () => {
        if (state) {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li>
                    <button className="btn #c62828 red darken-3" 
                            onClick={() => {
                                localStorage.clear()
                                dispatch({type:"CLEAR"})
                                history.push('/login')
                            }}
                    >
                        Logout
                    </button>
                </li>
            ]
        } else {
            return [
                <li><Link to="/register">Register</Link></li>,
                <li><Link to="/login">Login</Link></li>
            ]
        }
    }

    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to="/" className="brand-logo left">PT.AIA</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}    
                </ul>
            </div>
        </nav>
    )
}

export default NavBar