
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

    // console.log(props)
    
    // this method checks the session. If a user has logged in in the past eight hours it will fetch their data and pass it on to the redux store so that it can be used here in the component. 
    // useEffect(() => {
    //     // console.log('hit useEffect', props)
    //     if(!props.user.email){
    //         // console.log('hit')
    //         axios.get('/api/auth/user')
    //         .then(res => {
    //             console.log(res.data.email)
    //             if(res.data.email){
    //                 props.updateUser(res.data)
    //             }
    //             else {
    //                 props.history.push('/')
    //             }
    //             // console.log(props.user)            
    //         })
    //         .catch(err => console.log(err))
    //         }
        
    // }, [])

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const toggleLogin = () => {
        setLogin(!login)
    }


    const handleLoginUser = () => {
        // axios.post('/api/auth/login', {email: userEmail, password: userPassword})
        // .then(res => {
        //     // console.log(res.data)
        //     props.updateUser(res.data)
        //     props.history.push('/home')
        // })
        // .catch(err => console.log(err))
        props.history.push('/home')
    }

    const handleSignOut = () => {
        axios.post('/api/auth/logout')
        .then(res => {
            console.log(res)
            setLogin(false)
            props.updateUser({})
            props.history.push('/')
        })
        .catch(err => console.log(err))
    }
    // console.log(blockAccess)

    if(props.location.pathname !== '/' && props.location.pathname !=='/register' ){
        return(
            <main  className='header'>                
                <header>
                    <h1>newsCatch</h1>
                </header>
                <div id='menu-hamburger-icon'>
                    <i id='hamburger-icon' className='fas fa-bars fa-2x' onClick={toggleMenu} />
                </div>

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
                        <section id='user-email-display'>
                            {/* <p id='user-email'>{props.user.email}</p> */}
                        </section>
                </nav>


            </main>
           
    )
} else if(props.location.pathname === '/'){
    return(
        <main className='header'>
                <h1>newsCatch</h1>
                
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
} else {
    return(
        <div className='header'>
            <h1>newsCatch</h1>
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