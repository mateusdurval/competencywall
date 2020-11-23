
import React from 'react'
import './styles.css'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

import Logo from '../../assets/img/Logo'

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: undefined,
            name: undefined,
            password: undefined,
            confirmPassword: undefined,
            success: undefined,
            message: undefined
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);

        this.register = this.register.bind(this);
    }

    handleEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    handleName(event) {
        this.setState({
            name: event.target.value
        });
    }

    handlePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleConfirmPassword(event) {
        this.setState({
            confirmPassword: event.target.value
        });
    }


    register(event) {
        event.preventDefault()
        const { email, name, password, confirmPassword } = this.state
        let request = [
            {
                email: email,
                name: name,
                password: password,
                confirmPassword: confirmPassword
            }
        ]
    
        axios.post('http://localhost:3000/auth/register', request).then(resp => {

            const { success, message, token } = resp.data
            this.setState({
                success: success,
                message: message
            })
        }).catch( err => {
            console.log(err)
        })
    }

    render() {
        
        return (
            <div className="body">
                <section className="container2">
                    <form onSubmit={this.register}>
                        <p>{this.state.success}</p>
                        {
                            
                            this.state.success !== undefined ? (
                                this.state.success ? 
                                    <div className="alert alert-success" role="alert">
                                        {this.state.message}
                                    </div>
                                :   
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                            )   : ''
                        }

                        <h2>Crie sua conta</h2>
                        
                        <div>
                            <i className="far fa-envelope"></i>
                            <input id="email" type="email" name="email" placeholder="email@example.com" autoComplete="off" onChange={this.handleEmail} />
                        </div>
    
                        <div>
                            <i className="fas fa-user-alt"></i>
                            <input id="name" type="text" name="name" placeholder="Rodrigo Araújo dos Santos" autoComplete="off" onChange={this.handleName} />
                        </div>
    
                        <div>
                            <i className="fas fa-lock"></i>
                            <input id="password" type="password" name="password" placeholder="Sua senha" autoComplete="off" onChange={this.handlePassword} />
                        </div>
    
                        <div>
                            <i className="fas fa-lock"></i>
                            <input id="confirmPassword" type="password" name="passwordConfirm" placeholder="Confirme sua senha" autoComplete="off" onChange={this.handleConfirmPassword} />
                        </div>
    
                        <div className="btn-cadastre">
                            <p>Ao se registrar, você aceita nossos <span>termos de uso</span> e a nossa <span>política de privacidade.</span></p>
    
                            <button type="submit">CADASTRAR</button>
                        </div>
                    </form>
                </section>
    
                <section className="container3">
                    <div className="logo_cw">
                        <Logo id="img" />
                    </div>

                    <h2>Competency Wall ajuda você a se conectar e compartilhar suas skills e habilidades com pessoas do mundo todo!</h2>
    
                    <Link to="/" id="btn-back"><i className="fas fa-arrow-left"></i> Voltar para login</Link>
                </section>
            </div>
        )
    }

    
}



export default Register 