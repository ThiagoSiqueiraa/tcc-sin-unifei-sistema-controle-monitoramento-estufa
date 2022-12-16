import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import AuthContext from '../../source/Auth/AuthContext'
import './Login.css'

function Login() {
  const auth = useContext(AuthContext)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    if (email && password) {
      const isLogged = await auth.signin(email, password)
      if (isLogged) {
        console.log("LOGOU")
        navigate("/")
      } 
    }
  }

  return (
    <div className='Auth-form-login'>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="Auth-form-container">
        <div className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Autenticar-se</h3>
            <div className="form-group mt-3">
              <label>Endereço de e-mail</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Insira o seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Senha</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Insira a sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button onClick={handleLogin} type="submit" className="btn btn-primary">
                Entrar
              </button>
            </div>

            <div className="mt-3">
              <p className="text-center">
                Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )

}

export default Login
