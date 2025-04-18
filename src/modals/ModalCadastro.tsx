import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormEscolhe from '../componentsPage/FormEscolhe';

const ModalCadastro = (props: any) => {



    const [show, setShow] = useState(props.show)

    useEffect(() => {

        
        setShow(props.show);
        //console.log(props)
        //setUsuario_id(props.usuario_id)
                
    }, [props.show, props.usuario_id, props.now]);




    return (

        <div>

            <Modal
                
                //show={show}
                //fullscreen={true}
                //onHide={() => setShow(false)}
                //style={{ height: "auto" }}
                size="xl"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-xl"
                >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-xl">

                    
                        {props.tipo}



                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FormEscolhe tipo={props.tipo} setShow={setShow} />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setShow(false)}>Fechar</Button>
                    
                </Modal.Footer>

            </Modal>

        </div>

    )

}

export default ModalCadastro