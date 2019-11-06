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
    }
    
    const handleDeleteAccount = () => {
        axios.delete('/api/auth/user')
        .then(res => alert(res.data))
        .catch(err => console.log(err))
        props.history.push('/')
    }

    return(
      <body className='account-info'>
          <h1>MyAccount</h1>
            {!editing ? (
            <div >
            <p>{firstName}</p>
            <p>{lastName}</p>
            <p>{email}</p>
            <button onClick={() => setEditing(true)}>Edit</button>
        </div>
        ) : (
            <div>
                First Name
                <input 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} /><br/>
                Last Name
                <input 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} /><br/>
                Email
                <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)} /><br/>
                Current Password
                <input
                value={currentPassword}
                placeholder='Current Password'
                onChange={(e) => setCurrentPassword(e.target.value)} /><br/>
                New Password
                <input 
                value={newPassword}
                placeholder='New Password'
                onChange={(e) => setNewPassword(e.target.value)} /><br/>
                Confirm New Password
                <input 
                value={confirmNewPassword}
                placeholder='Confirm New Password'
                onChange={(e) => setConfirmNewPassword(e.target.value)} /><br/>

                <button onClick={() => handleCancel()}>Cancel</button>
                <button onClick={() => handleSaveChanges()}>Save Changes</button>
            </div>
        )}
        <button onClick={() => handleDeleteAccount()}>Delete Account</button>
      </body>
    )
}

export default MyAccount