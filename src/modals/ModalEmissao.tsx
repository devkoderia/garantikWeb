import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import FormEmissao from '../componentsPage/FormEmissao';




const ModalEmissao = (props: any) => {



    const [show, setShow] = useState(props.show)



    useEffect(() => {

        
        setShow(props.show);
        
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

                    
                        Emissão



                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                            
                    
                    <FormEmissao cliente_id={props.cliente_id} corretor_id={props.corretor_id} setShow={props.setShow} now={props.now} carregaEmissoes={props.carregaEmissoes} />
                     
                    
                            


                </Modal.Body>
               

            </Modal>

        </div>

    )
}

export default ModalEmissao