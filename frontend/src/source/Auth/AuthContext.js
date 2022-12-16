import React from 'react'

const AuthContext = React.createContext({
    user: {
        id: '',
        name: '',
        email: '',
        password: ''
    }, 
    signin(email, password) {},
    signout() {},
})

export default AuthContext
