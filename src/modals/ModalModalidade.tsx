import { useEffect, useState, forwardRef, ReactElement } from 'react';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import api from '../components/api';

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import JoditEditorComponent from "../components/JoditEditorComponent";

const Transition = forwardRef(function Transition(
	props: TransitionProps & { children: ReactElement<any, any> },
	ref
  ) {
	return <Slide direction="up" ref={ref} {...props} />;
  });



  interface iClientes {

    cliente_id: number,
    nomeFantasia: string,
    cnpj: string,


}



const ModalModalidade = (props: any) => {

    const [show, setShow] = useState(props.show)
    const [open, setOpen] = useState(false)

    const [acao, setAcao] = useState<string>('')
    const [titulo, setTitulo] = useState<string>('')
    const [frase, setFrase] = useState<string>('')
    
    
    const [descricao, setDescricao] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [modalidade_id, setModalidade_id] = useState<number | undefined>()
    const [cliente_id, setCliente_id] = useState<number | undefined>()
    const [ad_usr, setAd_usr] = useState<number | undefined>()

    const [textoPre, setTextoPre] = useState<string>('')
    const [texto, setTexto] = useState<string>('')

    const [clientes, setClientes] = useState<iClientes[]>([])
    const dadosUsuarios = sessionStorage.getItem('dadosUsuarios')



    const carregaClientes = () => {


        setClientes([])

        if (dadosUsuarios) {

            var dados = JSON.parse(dadosUsuarios)

            setClientes(dados.clientes)

            //setCliente_id(dados.cliente_id ? Number(dados.cliente_id) : undefined)


        }

    }





    useEffect(() => {

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
            carregaClientes()
		    setAd_usr(dados.usuario_id ? Number(dados.usuario_id) : undefined)
            setCliente_id(dados.clientes.length == 1 ? dados.clientes[0].cliente_id : undefined)

		}

	}, [dadosUsuarios])





    useEffect(() => {

        
        setShow(props.show);
        setModalidade_id(props.modalidade_id)
        setCliente_id(props.cliente_id)
                
    }, [props.show, props.usuario_id, props.now, props.cliente_id]);


    const carregaModalidade = () => {

        var dataPost = {

            cliente_id: cliente_id,
            
        }

        

        api.post(`modalidadeListaUm/${modalidade_id}`, dataPost).then((result) => {

            //console.log(result.data)
            var data = result.data[0]
            
            setDescricao(data.descricao)
            setTexto(data.texto)
            setTextoPre(data.textoPre)
            setCliente_id(data.cliente_id)
            setStatus(data.status)
            

        }).catch((err) => {

            console.log(err.response)

        })

    }

    useEffect(() => {

        if (modalidade_id) {

            carregaModalidade()

        }

    }, [modalidade_id])

    const validaSalvar = () => {


        if (descricao == '') {

            toast.error('Descrição não pode ficar em branco!')
            return false

        }


        setTitulo('Confirmação')
        setFrase('Confirma salvar a modalidade?')
        setOpen(true)


    }


    const salvar = () => {

        setOpen(false)

        if (props.modalidade_id) {

            
            var dataPost = {

                cliente_id: cliente_id,
                descricao: descricao,
                texto: texto,
                textoPre: textoPre,
                ad_usr: ad_usr,
                status: status,
    
            }
    
            api.put(`modalidade/${props.modalidade_id}`, dataPost).then((result) => {

                
                if (result.data.status == 'ok') {
    
                    toast.success('Registro salvo com sucesso!')
                    props.carregaModalidades()
                    props.setShow(false)
                    return false
    
                }

            }).catch((err) => {

                console.log(err.response)

            })


        } else {

            var dataPost = {

                cliente_id: cliente_id,
                descricao: descricao,
                texto: texto,
                textoPre: textoPre,
                ad_usr: ad_usr,
                status: status,
    
            }
    
            //console.log(dataPost)
    
            api.post('modalidade', dataPost).then((result) => {
    
                if (result.data.status == 'ok') {
    
                    toast.success('Registro salvo com sucesso!')
                    props.carregaModalidades()
                    props.setShow(false)
                    return false
    
                }
    
            }).catch((err) => {
    
                console.log(err.response)
    
            })
    

        }



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

                    
                        Modalidade



                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="row g-3">    

                        <div className="col-md-12">

                            <select className="form-control" value={cliente_id} disabled={ clientes.length > 1 ? false : true } onChange={event => setCliente_id(event.target.value ? Number(event.target.value) : undefined)} >
                                { clientes.length > 1 && ( <option value="">[Selecione]</option> )}
                                
                                {

                                    clientes.map((rs: iClientes) => 
                                        
                                        <option value={rs.cliente_id}>{rs.cnpj} - {rs.nomeFantasia}</option>
                                    )

                                }

                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Descrição *</label>
                            <input type="text" className="form-control" style={{ backgroundColor: '#e9f2f1'}} value={descricao} onChange={event => setDescricao(event.target.value)} maxLength={150} />
                        </div>
                        
                        <div className="col-md-12">
                            <label className="form-label">Status *</label>
                            <select className="form-control" value={status} onChange={event => setStatus(event.target.value)} >
                                <option value="">[Selecione]</option>
                                <option value="A">Ativo</option>
                                <option value="I">Inativo</option>
                            </select>
                        </div>

                        <div className="col-md-12">
                            <label  className="form-label">Texto pré</label>
                            <JoditEditorComponent
                                key="editor-corretor"
                                initialValue={textoPre}
                                onChange={(value) => setTextoPre(value)}
                            />
                        </div>

                        <div className="col-md-12">
                            <label  className="form-label">Texto</label>
                            <JoditEditorComponent
                                key="editor-corretor"
                                initialValue={texto}
                                onChange={(value) => setTexto(value)}
                            />
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

export default ModalModalidade