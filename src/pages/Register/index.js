import React from 'react';
import { Link, Redirect } from 'react-router-dom'

import api from '../../services/api';
import { setTokenRegister } from "../../services/auth";

import './register2.css'
import Logo from '../../assets/img/Logo'

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    email: Yup.string()
    .email('E-mail inválido.')
    .required('É necessário informar um e-mail.'),
    name: Yup.string()
        .min(2, 'Insira um nome válido.')
        .max(50, 'Muito longo.')
        .required('É necessário informar um nome.'),
    password: Yup.string()
        .min(8, 'Senha deve conter 8 caracteres.')
        .max(50, 'Too Long.')
        .required('É necessário informar uma senha'),
    ConfirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais.')
        .required('Confirme sua senha.')
});

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            messageError : '',
            redirect: false
        }
    }

    cadastre = values => {
        api.post('/auth/register', values).then(resp => {
            const { token, message } = resp.data
    
            if (token) {
                const response = setTokenRegister(token)
                if (response)
                    this.setState({ redirect: true })
                else {
                    this.setState({ messageError: 'Erro ao importar token' })
                }   
            } else {
                this.setState({ messageError: message })
            }
            
        }).catch( err => {
            console.log(err)
        })
    }

    render() {
        const { redirect, messageError } = this.state
        
        if (redirect) {
            return <Redirect to={'/app'} />
        }

        return (
            <div className="body">
                <div id="container">
                    <h1>Crie sua conta</h1>
                    <div id="messageError">
                        <p>{messageError}</p>
                    </div>
                    <Formik
                        initialValues={{
                            email: '',
                            name: '',
                            password: '',
                            ConfirmPassword: ''
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => this.cadastre(values)}
                    >
                        
                        {({ errors, touched }) => (
                        <Form className="form">

                                {errors.email && touched.email ? <span className="errors">{errors.email}</span> : null}
                            <div>
                                <i className="far fa-envelope"></i>
                                <Field name="email" type="email" className="input" placeholder="email@example.com" autoComplete="off" />
                            </div>


                                {errors.name && touched.name ? ( <span className="errors">{errors.name}</span>) : null}
                            <div>
                                <i className="fas fa-user-alt"></i>
                                <Field name="name" type="text" className="input" placeholder="Raphael Gomes Silva" autoComplete="off" />
                            </div>


                                {errors.password && touched.password ? (<span className="errors">{errors.password}</span>) : null}
                            <div>
                                <i className="fas fa-lock"></i>
                                <Field name="password" type="password" className="input" placeholder="Sua senha" autoComplete="off" />
                            </div>
                            

                                {errors.ConfirmPassword && touched.ConfirmPassword ? (<span className="errors">{errors.ConfirmPassword}</span>) : null}
                            <div>
                                <i className="fas fa-lock"></i>
                                <Field name="ConfirmPassword" type="password" className="input" placeholder="Confirme sua senha" autoComplete="off" />
                            </div>

                            <div id="considerations">
                                <p>Ao se registrar, você aceita nossos <span>termos de uso</span> e a nossa <span>política de privacidade</span>.</p>
                            </div>
                            
                            <button type="submit">CADASTRAR</button>
                        </Form>
                        )}
                    </Formik>
                </div>

                <div id="container2">
                    <div className="logo_cw">
                        <Logo id="img" />
                    </div>

                    <h2>Competency Wall ajuda você a se conectar e compartilhar suas skills e habilidades com pessoas do mundo todo!</h2>

                    <Link to="/" id="btn-back"><i className="fas fa-arrow-left"></i> Voltar para login</Link>
                </div>
            </div>
        )
    }
}

export default Register