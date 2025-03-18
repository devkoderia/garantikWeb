import { useState, useEffect, forwardRef, ReactElement } from "react";
import { useParams } from "react-router"
import { validaEmail, validaCPF } from "../components/generalFunctions";
import TextInput from "../components/TextInput";
import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast'
import api from "../components/api";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";



const Transition = forwardRef(function Transition(
	props: TransitionProps & { children: ReactElement<any, any> },
	ref
  ) {
	return <Slide direction="up" ref={ref} {...props} />;
  });







const CadastroConvite = () => {


    const { chaveLink, cliente_id } = useParams()

    const [open, setOpen] = useState(false)

    const [acao, setAcao] = useState<string>('')
    const [titulo, setTitulo] = useState<string>('')
    const [frase, setFrase] = useState<string>('')

    const [cpf, setCpf] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [telefone, setTelefone] = useState<string>('')
    const [email, setEmail] = useState<string | undefined>('')

    const [conviteValido, setConviteValido] = useState<boolean>(true)

    const [nomeFantasia, setNomeFantasia] = useState<string | undefined>('')

    const [senha, setSenha] = useState<string>('')
    const [confirmaSenha, setConfirmaSenha] = useState<string>('')

    const ano = moment().format('YYYY')


    const validaEnvioCadastro = () => {

        if (telefone == '') {

            toast.error('Telefone não pode ficar em branco!')
            return false

        }

        if (!validaCPF(cpf?.replaceAll('.', '').replaceAll('-', ''))) {

            toast.error('CPF inválido!')
            return false

        }

        if (nome == '') {

            toast.error('Nome não pode ficar em branco!')
            return false

        }

        if (senha != confirmaSenha) {

            toast.error('Senhas não conferem!')
            return false

        } else {

            if (senha.length < 5) {

                toast.error('A senha precisa ter no mínimo 5 caracteres!')
                return false

            } else {

                const regex = /[0-9]/;
                if (!regex.test(senha)) {

                    toast.error('Sua senha precisa ter ao menos um caractere numérico!')
                    return false

                } else {

                    const regex = /[A-Z]/;
                    if (!regex.test(senha)) {

                        toast.error('Sua senha precisa ter ao menos uma letra maiúscula!')
                        return false

                    } else {

                        
                        let regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/)

                        if (!regex.test(senha)) {

                            toast.error('Sua senha precisa ter ao menos um caractere especial e uma letra miníscula!')
                            return false
    
                        }

                    }
                    
                }
                


            }

        }


        setTitulo('Confirmação')
        setFrase('Confirma os dados?')
        setOpen(true)


    }

    const salva = () => {

        var dataPost = {

            nome: nome,
            email: email,
            cpf: cpf.replaceAll('.', '').replaceAll('-', ''),
            senha: senha,
            telefone: telefone,

        }

        console.log(dataPost)

        return false

    }


    const validaConvite = () => {

        var dataPost = {

            chaveLink: chaveLink,
            cliente_id: cliente_id,

        }


        api.post('conviteValida', dataPost).then((result) => {

            if (result.data.length > 0) {

                setConviteValido(true)

                var data = result.data[0]

                setNomeFantasia(data.nomeFantasia)
                setEmail(data.email)


            } else {

                setConviteValido(false)

            }

        }).catch((err) => {

            console.log(err.response)

        })


    }

    useEffect(() => {

        validaConvite()

    }, [])


    return (

        <div>


            <div className="bg-error">

            
                    <div className="pt-5">
                    
                        <div className="container pt-5">
                            <div className="row pt-5">
                                <div className="col-lg-12">
                                    <div className="text-center error-pages">
                                        <h2 className="coming-soon-title text-dark fw-bold mb-3">Convite</h2>
                                        <h6 className="text-black text-uppercase">{nomeFantasia}</h6>
                                        <br/>
                                        <p className="text-primary">Por favor, informe os dados abaixo para fazer parte da equipe.</p>
                                    </div>
                                        <div className="text-left error-pages">

                                            <div className="row">
                                                <div className="col-xl-8 mx-auto">
                                                    <div className="card">
                                                        <div className="card-header px-4 py-3">
                                                            <h5 className="mb-0">Cadastre-se</h5>
                                                        </div>
                                                        <div className="card-body p-4">
                                                            <form className="row g-3 needs-validation">
                                                                <div className="col-md-4">
                                                                    <label className="form-label">CPF</label>
                                                                    <TextInput placeholder="000.000.0000-00" maskType="cpf" value={cpf} className="form-control"
                                                                    onChange={event => setCpf(event.target.value)} 
                                                                    />
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <label className="form-label">Nome</label>
                                                                    <input type="text" className="form-control" maxLength={255} placeholder="Nome completo" value={nome} onChange={event => setNome(event.target.value)} />
                                                                    
                                                                </div>

                                                                <div className="col-md-9">
                                                                    <label className="form-label">E-mail</label>
                                                                    <input type="text" className="form-control" maxLength={255} value={email} disabled />
                                                                    
                                                                </div>


                                                                <div className="col-md-3">
                                                                    <label className="form-label">Tel. Celular</label>
                                                                    <TextInput placeholder="(00) 00000-0000" maskType="phone" className="form-control" value={telefone} onChange={event => setTelefone(event.target.value)} />
                                                                    
                                                                </div>

                                                                
                                                               
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Senha</label>
                                                                    <input type="password" className="form-control" maxLength={50} value={senha} onChange={event => setSenha(event.target.value)} />
                                                                    
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <label className="form-label">Confirma senha</label>
                                                                    <input type="password" className="form-control" maxLength={50} value={confirmaSenha} onChange={event => setConfirmaSenha(event.target.value)} />
                                                                    
                                                                </div>
                                                               
                                                                
                                                                <div className="col-md-12" style={{ marginTop: 20, textAlign: 'right'}}>
                                                                    
                                                                        <button type="button" className="btn btn-primary px-4" onClick={validaEnvioCadastro}>Enviar</button>
                                                                        
                                                                    
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center error-pages">
                                            

                                            <div className="mt-4">
                                                <p className="text-dark">Garantik © {ano} | Todos os direitos reservados.</p>
                                            </div>
                                            

                                        </div>
                                        
                                </div>
                            </div>
                        </div>

                    </div>


                
            </div>





            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
                fullWidth 
                >
                <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
                    
                    <div style={{ textAlign: 'justify'}}>
                    {frase}
                    </div>

                </DialogContent>
                <DialogActions>

                    <Button color="primary" variant="contained" onClick={() => setOpen(false)} style={{ display: acao == 'dadosEnviados' ? 'table-row' : 'none'}}>
                        Ok
                    </Button>
                    

                    <Button color="error" variant="contained" onClick={() => setOpen(false)} style={{ display: acao == ''  ? 'table-row' : 'none'}}>
                        Cancelar
                    </Button>
                    <Button color="success" variant="contained" onClick={() => salva()} style={{ display: acao == '' ? 'table-row' : 'none'}}>
                        Ok
                    </Button>
            

                </DialogActions>
            </Dialog>





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

export default CadastroConvite