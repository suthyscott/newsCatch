import React, {useState, useEffect} from 'react';
import '../../reset.css';
import './Header.css';
import {Link} from 'react-router-dom';

function Header(){
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

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
                            <Link to='/myaccount'><button className='link'>My Account</button></Link>
                            <Link to='/home'><button className='link'>Home</button></Link>
                            <Link to='/savedarticles'><button className='link'>Saved Articles</button></Link>
                            <Link to='/'><button className='link'>Sign Out</button></Link>
                    </section>
                </nav>
            ) : null}

            <nav >

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
}

export default Header