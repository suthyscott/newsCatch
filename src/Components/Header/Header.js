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
    const [blockAccess, setBlockAccess] = useState(false)
    console.log(blockAccess)
    

    useEffect(() => {
        console.log('hit useEffect', props)
        if(!props.user.email){
            // console.log('hit')
            axios.get('/api/auth/user')
            .then(res => {
            props.updateUser(res.data)
        })
        .catch(err => console.log(err))
        }        
    }, [])

    useEffect(() => {
        console.log('hit useEffect2', props)
        if(!props.user.email){
            setBlockAccess(true)
        } else {
            setBlockAccess(false)
        }        
    }, [])

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const toggleLogin = () => {
        setLogin(!login)
    }

    const handleSendBack = () => {
        props.history.push('/')
    }


    const handleLoginUser = () => {
        axios.post('/api/auth/login', {email: userEmail, password: userPassword})
        .then(res => {
            // console.log(res.data)
            props.updateUser(res.data)
            props.history.push('/home')
        })
        .catch(err => console.log(err))
    }

    const handleSignOut = () => {
        axios.post('/api/auth/logout')
        .then(res => {
            setLogin(false)
            props.updateUser({})
            props.history.push('/')
        })
    }
    // console.log(props)

    if(props.location.pathname !== '/' && props.location.pathname !=='/register' && blockAccess === false){
    return(
        <main  className='header'>
            
            <header>
                <h1>NewsCatch</h1>
            </header>
            <div id='menu-hamburger-icon'>
                <i id='hamburger-icon' className='fas fa-bars fa-2x' onClick={toggleMenu} />
            </div>

            {showMenu ? (
                <nav className='dropdown-menu'>

                    <section id='nav-buttons-dropdown'>
                        <p id='user-email'>{props.user.email}</p>
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
                    <section id='user-email-display'>
                        <p id='user-email'>{props.user.email}</p>
                    </section>
            </nav>


        </main>
           
    )
} else if(props.location.pathname === '/'){
    return(
        <main className='header'>
                <h1>NewsCatch</h1>

                {!login ? (
                    <nav id='nav-buttons-landing'>
                        <button className='nav-link' onClick={() => toggleLogin()}>Login</button>
                        <Link to='/register' ><button className='nav-link'>Register</button></Link>
                    </nav>
                ) : (
                    <div>
                        <input 
                        placeholder='email'
                        onChange={e => setUserEmail(e.target.value)} />
                        <input
                        placeholder='password'
                        onChange={e => setUserPassword(e.target.value)} />
                        <button id='login-button' onClick={() => handleLoginUser()}>Login</button>
                    </div>
                )}
        </main>
    )
} else if (props.location.pathname !== '/' && props.location.pathname !=='/register' && blockAccess === true) {
    return(
        <div>
            {alert("Must be authorized to access this url. Please go back and log in.")}
            {handleSendBack()}
        </div>
    )
} else {
    return(
        <div className='header'>
            <h1>NewsCatch</h1>
        </div>
    )
}
}

const mapStateToProps = reduxState => {
    const {user} = reduxState.authReducer;
    return {
        user
    }
}

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))