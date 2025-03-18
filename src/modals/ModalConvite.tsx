import { useEffect, useState, forwardRef, ReactElement } from 'react';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import api from '../components/api';
import { validaEmail } from '../components/generalFunctions';

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




const ModalConvite = (props: any) => {



    interface iClientes {

        cliente_id: number,
        nomeFantasia: string,
        cnpj: string,


    }


    const [open, setOpen] = useState(false) 

    const [acao, setAcao] = useState<string>('')
    const [titulo, setTitulo] = useState<string>('')
    const [frase, setFrase] = useState<string>('')

    const [show, setShow] = useState(props.show)
    const [cliente_id, setCliente_id] = useState<number | undefined>()

    const [nome, setNome] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [nomeFantasia, setNomeFantasia] = useState<string>('')

    useEffect(() => {

        
        setShow(props.showConvite);        
        
                
    }, [props.showConvite,  props.nowConvite]);



    const validaEnviaConvite = () => {

        if (cliente_id == undefined) {

            toast.error('Por favor, selecione a afiançadora!')
            return false

        }


        if (!validaEmail(email)) {

            toast.error('E-mail inválido!')
            return false

        }

        if (nome == '') {

            toast.error('Por favor, informe o nome da pessoa convidada!')
            return false

        }


        setTitulo('Confirmação')
        setFrase('Confirma o envio do convite?')
        setOpen(true)


    }

    const enviaConvite = () => {

        setOpen(false)

        var dataPost = {

            cliente_id: cliente_id,
            email: email,
            nome:  nome,
            nomeFantasia: nomeFantasia,
            ad_usr: props.usuario_id_session,

        }

        //console.log(dataPost)
        //return false

        api.post('convite', dataPost).then((result) => {

            if (result.data.status == 'ok') {

                setAcao('conviteEnviado')
                setTitulo('E-mail enviado com sucesso')
                setFrase('Um e-email contendo um link para autocadastro foi enviado. Assim que houver o preenchimento o cadastro será exibido no sistema. Este link se expira em 48 horas!')
                setOpen(true)
                props.setShowConvite(false)


            }

        }).catch((err) => {

            console.log(err.response)

        })


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

                    
                        Convite



                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="row g-3">    

                        
                        <div className="col-md-12">
                            <label className="form-label">Nome *</label>
                            <input type="text" className="form-control" style={{ backgroundColor: '#e9f2f1'}} value={nome} onChange={event => setNome(event.target.value)} maxLength={150} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">E-mail *</label>
                            <input type="email" className="form-control" value={email} onChange={event => setEmail(event.target.value)} maxLength={150} />
                        </div>

                        <div className="col-md-12">
                            
                            <label className="form-label">Afiançadora *</label>
                            <select className="form-control" value={cliente_id} 
                            
                            onChange={event => {
                                const selectedId = event.target.value ? Number(event.target.value) : undefined;
                                setCliente_id(selectedId);
                        
                                const selectedCliente = props.clientes.find((cliente: iClientes) => cliente.cliente_id === selectedId);
                                setNomeFantasia(selectedCliente ? selectedCliente.nomeFantasia : "");
                            }}
                            
                             >
                                <option value="">[Selecione]</option>
                                {

                                    props.clientes.map((rs: iClientes) => 
                                        
                                        <option value={rs.cliente_id}>{rs.cnpj} - {rs.nomeFantasia}</option>
                                    )

                                }

                            </select>
                        </div>



                        <div className="col-12" style={{ textAlign: 'right'}}>

                            <button type="button" className="btn btn-dark" onClick={() => props.setShowConvite(false)}>Fechar</button>&nbsp;                            
                            <button type="button" className="btn btn-success" onClick={validaEnviaConvite}>Enviar convite</button>
                            
                            
                            
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
                    <Button color="success" variant="contained" onClick={() => enviaConvite()} style={{ display: acao == '' ? 'table-row' : 'none'}}>
                        Ok
                    </Button>
            

                </DialogActions>
            </Dialog>



        </div>

    )

}


export default ModalConvite