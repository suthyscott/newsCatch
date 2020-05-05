import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './MyAccount.css'

function MyAccount(props){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [editing, setEditing] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    useEffect(() => {
        axios.get('/api/auth/userinfo')
        .then(res => {
            const {first_name, last_name, email} = res.data
            setFirstName(first_name)
            setLastName(last_name)
            setEmail(email)
        })
        .catch(err => console.log(err))
    }, [])
    
    const handleCancel = () => {
        axios.get('/api/auth/userinfo')
        .then(res => {
            const {first_name, last_name, email} = res.data
            setFirstName(first_name)
            setLastName(last_name)
            setEmail(email)
        })
        .catch(err => console.log(err))

        setCurrentPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
        setEditing(false)
    }

    const handleSaveChanges = () => {
        if(newPassword === confirmNewPassword){
            axios.put('/api/auth/userinfo', {email, first_name: firstName, last_name: lastName, currentPassword, newPassword})
            .then(res => {
                console.log(res.data)
                const {first_name, last_name, email} = res.data
                setFirstName(first_name)
                setLastName(last_name)
                setEmail(email)
            })
            .catch(err => console.log(err))
            setEditing(false)
        } else {
            alert('New passwords do not match. Please re-confirm passwords to continue.')
        }
    }
    
    const handleDeleteAccount = () => {
        axios.delete('/api/auth/user')
        .then(res => alert(res.data))
        .catch(err => console.log(err))
        props.history.push('/')
    }

    return(
      <body className='account-info'>
          <h1 id='my-account-header'>MyAccount</h1>
            {!editing ? (
            <div className='info-container'>
            <p className='info-line'>{firstName}</p>
            <p className='info-line'>{lastName}</p>
            <p className='info-line'>{email}</p>
            <button className='my-account-buttons' id='my-account-edit-button' onClick={() => setEditing(true)}>Edit</button>
            <button className='my-account-buttons' onClick={() => handleDeleteAccount()}>Delete Account</button>
        </div>
        ) : (
            <div className='info-container-editing'>
                First Name
                <input 
                className='info-input'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} /><br/>
                Last Name
                <input 
                className='info-input'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} /><br/>
                Email
                <input 
                className='info-input'
                value={email}
                onChange={(e) => setEmail(e.target.value)} /><br/>
                Current Password
                <input
                className='info-input'
                type='password'
                value={currentPassword}
                placeholder='Current Password'
                onChange={(e) => setCurrentPassword(e.target.value)} /><br/>
                New Password
                <input 
                className='info-input'
                type='password'
                value={newPassword}
                placeholder='New Password'
                onChange={(e) => setNewPassword(e.target.value)} /><br/>
                Confirm New Password
                <input 
                className='info-input'
                type='password'
                value={confirmNewPassword}
                placeholder='Confirm New Password'
                onChange={(e) => setConfirmNewPassword(e.target.value)} /><br/>

                <section className='edit-option-buttons'>
                    <button className='my-account-buttons' id='my-account-cancel-button' onClick={() => handleCancel()}>Cancel</button>
                    <button className='my-account-buttons' id='my-account-save-changes-button' onClick={() => handleSaveChanges()}>Save Changes</button>
                </section>

                <button className='my-account-buttons' onClick={() => handleDeleteAccount()}>Delete Account</button>
            </div>
        )}
      </body>
    )
}

export default MyAccount