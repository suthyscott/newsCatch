const initialState = {
    user: {}
}

const UPDATE_USER = 'UPDATE_USER';

export function updateUser(userObj){
    // console.log('hit updateUser', userObj)
    return{
        type: UPDATE_USER,
        payload: userObj
    }
}

export default function authReducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case UPDATE_USER:
            // console.log('hit UPDATE_USER', payload)
            return {...state, user: payload} 
        default:
            return state
    }
}