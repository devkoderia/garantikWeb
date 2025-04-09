import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';
import FormProdutor from '../componentsPage/FormProdutor';

const ModalProdutor = (props: any) => {



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

                    
                        Produtor



                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                            
                        
                            <FormProdutor cliente_id={props.cliente_id} produtor_id={props.produtor_id} setShow={props.setShow} now={props.now} carregaProdutores={props.carregaProdutores} />
                        
                    
                            


                </Modal.Body>
               

            </Modal>

        </div>

    )

}

export default ModalProdutor