import React from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/api';
import { setTokenLogin } from '../../services/auth'

import Home from '../Home'

import './welcome.css'

import Logo from '../../assets/img/Logo'

class Welcome extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            messageError: ''
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

        this.SubmitAuthenticate = this.SubmitAuthenticate.bind(this);
    }

    handleEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    handlePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    async SubmitAuthenticate(event) {
        event.preventDefault()

        const { email, password } = this.state

        if(email === '' && password === '') {
            this.setState({
                messageError: 'Informe um e-mail e senha válidos.'
            })
            return
        }
    
        let request = [
            {
                email: email,
                password: password
            }
        ]        

        await api.post('/auth/authenticate', request).then(resp => {
            const { token, message, user } = resp.data

            if (token) {
                const response = setTokenLogin(token)
                response ? 
                    (<Home id={user._id} />)
                : 
                alert('erro')
            } else {
                this.setState({ messageError: message })
            }
            
        }).catch( err => {
            console.log(err)
        })
    }

    render() {
        const { messageError } = this.state;
        return (
            <div className="body-welcome">

                <div id="logo">
                    <Logo />
                </div>
                <div className="container">
                    <div id="messageError">
                        <p>{ messageError }</p>
                    </div>
                    
                    <div className="login">
                        <form onSubmit={this.SubmitAuthenticate} className="form">
                            <div>
                                <i className="far fa-envelope"></i>
                                <input id="email" type="email" name="email" placeholder="E-mail" autoComplete="off" onChange={this.handleEmail} />
                            </div>

                            <div>
                                <i className="fas fa-lock"></i>
                                <input id="password" type="password" name="password" placeholder="Senha" onChange={this.handlePassword}/>
                            </div>

                            <a href="/">Esqueci minha senha</a>
                            <button type="submit">ENTRAR</button>

                            <div id="create-account">
                                <hr></hr>
                                <p>Não tem uma conta? <Link to="/register">Registre-se</Link></p>
                            </div>
                        </form>
                    </div>

                    <div id="reservation">
                        <p>&copy; Competency Wall 2020</p>
                        <p>Todos os direitos reservados.</p>
                    </div>
                </div>

            </div>
        )
    }
}

export default Welcome