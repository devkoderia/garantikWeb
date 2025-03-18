import { useState } from "react";
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast'
import api from "../components/api";
import { validaCPF } from "../components/generalFunctions"
import TextInput from "../components/TextInput";

const LoginPage = () => {


    const navigate = useNavigate()

    const [cpf, setCpf] = useState<string>('')
    const [senha, setSenha] = useState<string>('')



    const login = () => {

        if (!validaCPF(cpf.replaceAll('.', '').replaceAll('-', ''))) {


            toast.error('CPF inválido!')
            
            return false

        }


        if (senha == '') {


            toast.error('Por favor, informe a senha!')
            
            return false

        }

        var dataPost = {

            cpf: cpf.replaceAll('.', '').replaceAll('-', ''),
            senha: senha,

        }

        

        api.post('login', dataPost).then((result) => {

            //console.log(result.data[0])
            //return false

			if (result.data[0].usuario_id) {


				var dadosUsuarios = JSON.stringify(result.data[0])

				sessionStorage.setItem('dadosUsuarios', dadosUsuarios)

				navigate('/Dashboard')

			}


        }).catch((err) => {

            console.log(err.response)

        })

        //navigate('/Dashboard')

    }

    return (

        <div>

                <div className="auth-basic-wrapper d-flex align-items-center justify-content-center">
                    <div className="container-fluid my-5 my-lg-0">
                        <div className="row">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
                            <div className="card rounded-4 mb-0 border-top border-4 border-primary border-gradient-1">
                            <div className="card-body p-5">
                                <img src="assets/images/logo1.png" className="mb-4" width="145" alt="" style={{ display: 'none' }}/>
                                <h4 className="fw-bold">GarantiK</h4>
                                <p className="mb-0">Por favor, informe suas credencias para login</p>

                                <div className="form-body my-5">
                                    <form className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label">CPF</label>
                                            
                                            <TextInput placeholder="000.000.0000-00" maskType="cpf" value={cpf} className="form-control"
											onChange={event => setCpf(event.target.value)} 
											onKeyPress={(e) => {
												if (e.key === "Enter") {
													login()                                            
												}
											}}
											/>

									
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Senha</label>
                                            <div className="input-group" id="show_hide_password">
                                                <input type="password" className="form-control" value={senha} onChange={event => setSenha(event.target.value)}  placeholder="Informe sua senha" 
                                                onKeyPress={(e) => {
                                                    if (e.key === "Enter") {
                                                        login()                                            
                                                    }
                                                }}
                                                /> 
                                                
                                            </div>
                                        </div>
                                        <div className="col-md-6" style={{ display: 'none'}}>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                                                <label className="form-check-label" >Remember Me</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 text-end">	<a href="#">Esqueceu sua senha?</a>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button type="button" className="btn btn-info px-5" onClick={login}
                                                onKeyPress={(e) => {
                                                    if (e.key === "Enter") {
                                                        login()                                            
                                                    }
                                                }}
                                                >Login</button>
                                            </div>
                                        </div>
                                        
                                    </form>
                                </div>

                                

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>




					<Toaster
						position="top-right" // Posição no canto superior direito
						toastOptions={{
							style: {
								padding: "16px",
								color: "#fff",
							},
							success: {
								style: {
									background: "#4caf50", // Verde
								},
							},
							error: {
								style: {
									background: "#f44336", // Vermelho
								},
							},
							loading: {
								style: {
									background: "#ff9800", // Laranja
								},
							},

						}}
					/>

        </div>

    )

}

export default LoginPage