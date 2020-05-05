import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/authReducer';
import './Register.css';


function Register(props){
    const [firstName, setFirstName]= useState('')
    const [lastName, setLastName]= useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [confirmPassword, setConfirmPassword]= useState('')
  
    // console.log(firstName, lastName, email, password)

  const handleRegister = () => {
    if(password === confirmPassword){
        console.log('hit handleRegister')
        axios.post('/api/auth/register', {firstName, lastName, email, password})
        .then(res => {
            props.updateUser(res.data)
            props.history.push('/home')
        })
        .catch(err => console.log(err))
    } else {
        alert('Passwords do not match. Please re-enter passwords to create account.')
    }
  }

  const handleCancelRegister = () => {
      props.history.push('/')
  }

    return(
        <body>
            <div id='register-form'>
                <p id='register-greeting'>Welcome to newsCatch!</p>
                <input className='register-input' placeholder='First Name' onChange={e => setFirstName(e.target.value)}/>
                <input className='register-input' placeholder='Last Name' onChange={e => setLastName(e.target.value)} />
                <input className='register-input' placeholder='Email address' onChange={e => setEmail(e.target.value)} />
                <input
                type='password' 
                className='register-input' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                <input
                type='password' className='register-input' placeholder='Confirm Password' onChange={e => setConfirmPassword(e.target.value)} />

                <nav id='register-nav-buttons'>
                    <button id='cancel-button' onClick={() => handleCancelRegister()}>Cancel</button>
                    <button id='register-button' onClick={() => handleRegister()}>Register</button>
                </nav>
                
            </div>
        </body>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)