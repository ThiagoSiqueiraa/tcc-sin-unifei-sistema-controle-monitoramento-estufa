// o provider usa o contexto para passar o valor do token para os componentes
import { useEffect, useState } from 'react'
import useHttp from '../../hooks/use-http'

import AuthContext from './AuthContext'



const AuthProvider = props => {

    const { sendRequest } = useHttp()
    const [user, setUser] = useState(null)


    

    const authorize = (response) => {
        const { data } = response
        if (!data.user || !data.token) {
            return false;
        }

        setUser(data.user)
        setToken({ token: data.token, user: data.user })
        return true;

    }

    useEffect(() => {
        const validateToken = async() => {
            const tokenStorageData = localStorage.getItem('token')
            if(tokenStorageData){
               //sendRequest({url: `${process.env.REACT_APP_API_URL}/auth/validate-token`}, handleDataToken)
                setUser({
                    name: 'teste',
                    email: 'teste@teste.com.br',
                    id: '123'
                })
            }
        }

        validateToken()
    }, [sendRequest])


    const signin = (email, password) => {
        return sendRequest({
            url: `${process.env.REACT_APP_API_URL}/sessions`,
            method: 'POST',
            body: {
                email,
                password
            }
        }, authorize)
        
  
        // sendRequest({
        //     url: `${process.env.REACT_APP_API_URL}/auth/login`,
        //     body: {
        //         email,
        //         password
        //     },
        //     method: 'post'
        // }, authorizeMock)

    }

    const signout = () => {
        setUser(null)
       deleteToken()
    }

    const setToken = ({token, user}) => {
        localStorage.setItem('token', JSON.stringify({token, user}))
    }

    const deleteToken = () => {
        localStorage.removeItem('token')
    }



    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
