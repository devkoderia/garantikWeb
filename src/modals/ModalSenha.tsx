import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';


const ModalSenha = (props: any) => {

    const [show, setShow] = useState(props.show)

    useEffect(() => {

        
        setShow(props.show);
        //setUsuario_id(props.usuario_id)
                
    }, [props.show, props.usuario_id, props.now]);


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

                    
                        Alterar senha



                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="row g-3">    

                        <div className="col-md-12">
                            <label className="form-label">Senha</label>
                            <input type="password" className="form-control" />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Confirma senha</label>
                            <input type="password" className="form-control" />
                        </div>


                        <div className="col-12" style={{ textAlign: 'right'}}>
                                                        
                            <button type="button" className="btn btn-dark" onClick={() => props.setShow(false)}>Fechar</button>&nbsp;
                            
                            
                        </div>

                    </div>

                </Modal.Body>

            </Modal>



        </div>

    )

}

export default ModalSenha