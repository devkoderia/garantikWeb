import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';

const ModalUsuario = (props: any) => {



    const [show, setShow] = useState(props.show)


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



    const dadosUsuarios = sessionStorage.getItem('dadosUsuarios')

    useEffect(() => {

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
		    setAd_usr(dados.usuario_id ? Number(dados.usuario_id) : undefined)
	

		}

	}, [dadosUsuarios])




    useEffect(() => {

        
        setShow(props.show);
        //setUsuario_id(props.usuario_id)
                
    }, [props.show, props.usuario_id, props.now]);



    const validaSalvar = () => {


        if (nome == '') {

            toast.error('Nome não pode ficar em branco!')
            return false

        }


        if (email == '') {

            toast.error('E-mail não pode ficar em branco!')
            return false

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

                    
                        Usuário



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

                        <div className="col-md-6">
                            <label className="form-label">Senha *</label>
                            <input type="password" className="form-control" value={senha} onChange={event => setSenha(event.target.value)} maxLength={50} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Confirma senha *</label>
                            <input type="password" className="form-control" value={confirmaSenha} onChange={event => setConfirmaSenha(event.target.value)} maxLength={50} />
                        </div>
                        

                        <div className="col-md-6">
                            <label className="form-label">Perfil *</label>
                            <select className="form-control" >
                                <option value="">[Selecione]</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Bloqueado *</label>
                            <select className="form-control" >
                                <option value="">[Selecione]</option>
                                <option value="">Sim</option>
                                <option value="">Não</option>
                            </select>
                        </div>
                        

                        <div className="col-12" style={{ textAlign: 'right'}}>

                            <button type="button" className="btn btn-dark" onClick={() => props.setShow(false)}>Fechar</button>&nbsp;                            
                            <button type="button" className="btn btn-success" onClick={validaSalvar}>Salvar</button>
                            
                            
                            
                        </div>

                    </div>

                </Modal.Body>

            </Modal>


        </div>

    )


}

export default ModalUsuario