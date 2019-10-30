import React, {useState, useEffect} from 'react';
import '../../reset.css';
import './Header.css';
import {Link, withRouter} from 'react-router-dom';

function Header(props){
    const [showMenu, setShowMenu] = useState(false)
    const [login, setLogin] = useState(false)


    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const toggleLogin = () => {
        setLogin(!login)
    }

    if(props.location.pathname !== '/' && props.location.pathname !=='/register'){
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
                        <p id='user-email'>user_email@email.com</p>
                            <Link to='/myaccount'><button className='link' onClick={() => toggleMenu()}>My Account</button></Link>
                            <Link to='/home'><button className='link' onClick={() => toggleMenu()}>Home</button></Link>
                            <Link to='/savedarticles'><button className='link' onClick={() => toggleMenu()}>Saved Articles</button></Link>
                            <Link to='/'><button className='link' onClick={() => toggleMenu()}>Sign Out</button></Link>
                    </section>
                </nav>
            ) : null}

            <nav id='nav-menu'>

                    <section id='nav-buttons'>
                        <Link to='/myaccount'><button className='nav-link'>My Account</button></Link>
                        <Link to='/home'><button className='nav-link'>Home</button></Link>
                        <Link to='/savedarticles'><button className='nav-link'>Saved Articles</button></Link>
                        <Link to='/'><button className='nav-link'>Sign Out</button></Link>
                    </section>
                    <section id='user-email-display'>
                        <p id='user-email'>user_email@email.com</p>
                    </section>
            </nav>


        </main>
           
    )
} else {
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
                        placeholder='email' />
                        <input
                        placeholder='password' />
                        <button id='login-button'>Login</button>
                    </div>
                )}
        </main>
    )
}
}

export default withRouter(Header)