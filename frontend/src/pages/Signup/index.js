import { useState } from "react"
import { Helmet } from "react-helmet"
import { Link, useNavigate } from "react-router-dom"
import useHttp from "../../hooks/use-http"

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const {  sendRequest } = useHttp()
    const navigate = useNavigate()
    function handleSignUp(){
        sendRequest({
            url: `${process.env.REACT_APP_API_URL}/users/signup`,
            method: 'POST',
            body: {
                email,
                password,
                firstName,
                lastName
            }
        }, handleResponse)
    }

    function handleResponse(res){
        if(res.status === 201){
            navigate('/login')
        }
    }


    return (
        <div className="Auth-form-login">
            <Helmet>
                <title>Minha Estufa</title>
            </Helmet>
            <div className="row Auth-form-container">
                <div className="Auth-form col-md-6 mx-auto">
                    <div className="myform form ">
                        <div className="logo mb-3">
                            <div className="col-md-12 text-center ">
                                <h3 className="Auth-form-title">Cadastre</h3>
                            </div>
                        </div>
                        <div>
                            <div className="form-group">
                                <label>Nome</label>
                                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="firstname" className="form-control" id="firstname" placeholder="Nome" />
                            </div>
                            <div className="form-group">
                                <label>Sobrenome</label>
                                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="lastname" className="form-control" id="lastname" placeholder="Sobrenome" />
                            </div>
                            <div className="form-group">
                                <label>E-mail</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="form-control" id="email" placeholder="E-mail" />
                            </div>
                            <div className="form-group">
                                <label>Senha</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="form-control" placeholder="Senha" />
                            </div>
                            <div className="form-group">
                                <p className="text-center">By signing up you accept our <a href="#">Terms Of Use</a></p>
                            </div>
                            <div className="col-md-12 text-center ">
                                <button onClick={handleSignUp} className=" btn btn-block mybtn btn-primary tx-tfm">Cadastrar</button>
                            </div>
                            
                            
                            <div className="form-group">
                                <p className="text-center">Já tem uma conta? <Link to="/login">Autentique-se aqui</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


      )

}

export default Signup