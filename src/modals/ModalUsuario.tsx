import { useEffect, useState, forwardRef, ReactElement } from 'react';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import api from '../components/api';
import TextInput from "../components/TextInput";
import { formataCPF, validaEmail } from '../components/generalFunctions'

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






const ModalUsuario = (props: any) => {

    interface iPerfis {

        descricao: string,
        perfil_id: number,

    }

    const [show, setShow] = useState(props.show)
    const [open, setOpen] = useState(false)

    const [acao, setAcao] = useState<string>('')
    const [titulo, setTitulo] = useState<string>('')
    const [frase, setFrase] = useState<string>('')
    

    const [usuario_id, setUsuario_id] = useState<number | undefined>()
    
    const [cliente_id, setCliente_id] = useState<number | undefined>()
    const [perfil_id, setPerfil_id] = useState<number | undefined>()
    const [produtor_id, setProdutor_id] = useState<number | undefined>()
    const [corretor_id, setCorretor_id] = useState<number | undefined>()
    const [cpf, setCpf] = useState<string | undefined>('')
    
    const [nome, setNome] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    const [confirmaSenha, setConfirmaSenha] = useState<string | undefined>('')
    const [ad_usr, setAd_usr] = useState<number | undefined>()
    const [perfis, setPerfis] = useState<[]>([])
    const [status, setStatus] = useState<string | undefined>('')


    const dadosUsuarios = sessionStorage.getItem('dadosUsuarios')

    useEffect(() => {

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
		    setAd_usr(dados.usuario_id ? Number(dados.usuario_id) : undefined)
	

		}

	}, [dadosUsuarios])



    const carregaPerfis = () => {

        if (cliente_id) {


            var dataPost = {

                cliente_id: cliente_id,
    
            }
    
            api.post('perfilListaTodos', dataPost).then((result) => {
    
                //console.log(result.data)
                setPerfis(result.data.map((rs: iPerfis) =>
                
                    <option value={rs.perfil_id}>{rs.descricao}</option>
                
                ))
    
            }).catch((err) => {
    
                console.log(err.response)
    
            })
    
        }


    }


    useEffect(() => {

        carregaPerfis()

    }, [cliente_id])


    useEffect(() => {

        
        setShow(props.show);
        setUsuario_id(props.usuario_id)
        setCliente_id(props.cliente_id)
                
    }, [props.show, props.usuario_id, props.now]);


    useEffect(() => {

        if (usuario_id) {

            var dataPost = {

                cliente_id: cliente_id

            }

            api.post(`usuario/${usuario_id}`, dataPost).then((result) => {

                console.log(result.data)
                var data = result.data[0]
                
                setCpf(data.cpf ? formataCPF(data.cpf) : '')
                setNome(data.nome)
                setEmail(data.email)
                setPerfil_id(data.perfil_id)
                setStatus(data.status)

            }).catch((err) => {

                console.log(err.response)

            })


        }



    }, [usuario_id])


    const validaSalvar = () => {


        if (nome == '') {

            toast.error('Nome não pode ficar em branco!')
            return false

        }


        if (!validaEmail(email)) {

            toast.error('E-mail inválido!')
            return false

        }


    }


    const salvar = () => {



    }


    return (

        <div>

            <Modal
                size="lg"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">

                    
                        Usuário



                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="row g-3">    

                        <div className="col-md-3">
                            <label className="form-label">CPF *</label>
                            <TextInput placeholder="000.000.0000-00" maskType="cpf" value={cpf} className="form-control"
                            onChange={event => setCpf(event.target.value)} 
                            
                            />
                        </div>
                        <div className="col-md-9">
                            <label className="form-label">Nome *</label>
                            <input type="text" className="form-control" style={{ backgroundColor: '#e9f2f1'}} value={nome} onChange={event => setNome(event.target.value)} maxLength={150} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">E-mail *</label>
                            <input type="email" className="form-control" value={email} onChange={event => setEmail(event.target.value)} maxLength={150} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Perfil *</label>
                            <select className="form-control" >
                                <option value="">[Selecione]</option>
                                {perfis}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Status *</label>
                            <select className="form-control" value={status} onChange={event => setStatus(event.target.value)} >
                                <option value="">[Selecione]</option>
                                <option value="A">Ativo</option>
                                <option value="I">Inativo</option>
                            </select>
                        </div>
                        

                        <div className="col-12" style={{ textAlign: 'right'}}>

                            <button type="button" className="btn btn-dark" onClick={() => props.setShow(false)}>Fechar</button>&nbsp;                            
                            <button type="button" className="btn btn-success" onClick={validaSalvar}>Salvar</button>
                            
                            
                            
                        </div>

                    </div>

                </Modal.Body>

            </Modal>


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

                    <Button color="primary" variant="contained" onClick={() => setOpen(false)} style={{ display: acao == 'conviteEnviado' ? 'table-row' : 'none'}}>
                        Ok
                    </Button>
                    

                    <Button color="error" variant="contained" onClick={() => setOpen(false)} style={{ display: acao == ''  ? 'table-row' : 'none'}}>
                        Cancelar
                    </Button>
                    <Button color="success" variant="contained" onClick={() => salvar()} style={{ display: acao == '' ? 'table-row' : 'none'}}>
                        Ok
                    </Button>
            

                </DialogActions>
            </Dialog>


        </div>

    )


}

export default ModalUsuario