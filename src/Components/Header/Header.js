
import React, {useState, useEffect} from 'react';
import '../../reset.css';
import './Header.css';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/authReducer';

function Header(props){
    const [showMenu, setShowMenu] = useState(false)
    const [login, setLogin] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    
    // This method checks the session. If a user has logged in in the past eight hours it will fetch their data and pass it on to the redux store so that it can be used here in the component. 
    useEffect(() => {
        if(!props.user.email){
            axios.get('/api/auth/user')
            .then(res => {
                // console.log(res.data.email)
                if(res.data.email){
                    props.updateUser(res.data)
                }
                else {
                    props.history.push('/')
                }          
            })
            .catch(err => console.log(err))
            }
        
    }, [])

    // Used to toggle the dropdown menu for mobile responsiveness.
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    // Used to show the login inputs when the user clicks 'Login' on the landing page. 
    const toggleLogin = () => {
        setLogin(!login)
    }

    // Self-explanatory.
    const handleLoginUser = () => {
        if(!userEmail || !userPassword){
            alert('You must fill enter your username and password')
        } else {axios.post('/api/auth/login', {email: userEmail, password: userPassword})
        .then(res => {
            console.log(res.data)
            props.updateUser(res.data)
            props.history.push('/home')
        })
        .catch(err => {
            console.log(err)
            alert('Incorrect password.')
        })}
    }

    // Self-explanatory.
    const handleSignOut = () => {
        axios.post('/api/auth/logout')
        .then(res => {
            setLogin(false)
            props.updateUser({})
            props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    // First display toggle. If the user is anywhere but on the landing or register pages this return value will be displayed. 
    if(props.location.pathname !== '/' && props.location.pathname !=='/register' ){
        return(
            <main  className='header'>                
                <header>
                    <h1 className='logo' onClick={() => props.history.push('/home')}>newsCatch</h1>
                </header>
                <div id='menu-hamburger-icon'>
                    <i id='hamburger-icon' className='fas fa-bars fa-2x' onClick={toggleMenu} />
                </div>
                {/* The toggle to show or hide the mobile dropdown menu. */}
                {showMenu ? (
                    <nav className='dropdown-menu'>

                        <section id='nav-buttons-dropdown'>
                                <Link to='/home'><button className='link' onClick={() => toggleMenu()}>Home</button></Link>
                                <Link to='/savedarticles'><button className='link' onClick={() => toggleMenu()}>Saved Articles</button></Link>
                                <Link to='/myaccount'><button className='link' onClick={() => toggleMenu()}>My Account</button></Link>
                                <button className='link' onClick={() => toggleMenu(), () => handleSignOut()}>Sign Out</button>
                        </section>
                    </nav>
                ) : null}

                <nav id='nav-menu'>

                        <section id='nav-buttons'>
                            <Link to='/home'><button className='nav-link'>Home</button></Link>
                            <Link to='/savedarticles'><button className='nav-link'>Saved Articles</button></Link>
                            <Link to='/myaccount'><button className='nav-link'>My Account</button></Link>
                            <button className='nav-link' onClick={() => handleSignOut()}>Sign Out</button>
                        </section>
                </nav>


            </main>
           
    )
    // Second display toggle. Displays if user is on landing page. 
} else if(props.location.pathname === '/'){
    return(
        <main className='header'>
                <h1 className='logo'>newsCatch</h1>
                {/* Expands the login inputs. */}
                {!login ? (
                    <nav id='nav-buttons-landing'>
                        <button className='nav-link' onClick={() => toggleLogin()}>Login</button>
                        <Link to='/register' ><button className='nav-link'>Register</button></Link>
                    </nav>
                ) : (
                    <div className='login-field'>
                        <input 
                        className='login-input'
                        placeholder='email'
                        onChange={e => setUserEmail(e.target.value)} />
                        <input
                        type='password'
                        className='login-input'
                        placeholder='password'
                        onChange={e => setUserPassword(e.target.value)}
                        onKeyDown={e => {
                            if(e.key === 'Enter'){
                                handleLoginUser()
                            }
                        }} />
                        <button id='login-button' onClick={() => handleLoginUser()}>Login</button>
                    </div>
                )}
        </main>
    )
    // Third display toggle. Shows when user is on register page. 
} else {
    return(
        <div className='header'>
            <h1 className='logo'>newsCatch</h1>
        </div>
    )
}
}

// Receiving state from authReducer.
const mapStateToProps = reduxState => {
    const {user} = reduxState.authReducer;
    return {
        user
    }
}

// Still not quite sure exactly what this does. 
const mapDispatchToProps = {
    updateUser
}

// Connects component to redux store. 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))