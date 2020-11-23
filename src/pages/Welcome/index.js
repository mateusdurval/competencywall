import React from 'react'
import { Link } from 'react-router-dom'
import { history } from '../../history'
import './styles.css'
import axios from 'axios'

import Logo from '../../assets/img/Logo'

class Welcome extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

        this.authenticate = this.authenticate.bind(this);
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

    async authenticate(event) {
        event.preventDefault()

        const { email, password } = this.state
    
        let request = [
            {
                email: email,
                password: password
            }
        ]        

        await axios.post('http://localhost:3000/auth/authenticate', request).then(resp => {

            const {message, success, token} = resp.data

            alert(message)
            localStorage.setItem('app-token', token)
            history.push('/home')
        }).catch( err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="body">
                <div className="logo">
                    <Logo id="img" />
                </div>
                <div className="container">
                    <div className="login">
                        <form onSubmit={this.authenticate} className="form">
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