import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './MyAccount.css'

function MyAccount(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        console.log('hit useEffect')
        axios.get('/api/auth/userinfo')
        .then(res => {
            console.log(res.data)
            const {first_name, last_name, email} = res.data
            setFirstName(first_name)
            setLastName(last_name)
            setEmail(email)
        })
        .catch(err => console.log(err))
    }, [])
    return(
        <div className='account-info'>
            MyAccount
            <p>{firstName}</p>
            <p>{lastName}</p>
            <p>{email}</p>
        </div>
    )
}

export default MyAccount