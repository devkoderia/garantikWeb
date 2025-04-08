import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormCorretor from '../componentsPage/FormCorretor';

const ModalCadastro = (props: any) => {



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

                    
                        Corretor



                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                            

                    <FormCorretor cliente_id={props.cliente_id} corretor_id={props.corretor_id} setShow={props.setShow} now={props.now} carregaCorretores={props.carregaCorretores} />
                            


                </Modal.Body>
               

            </Modal>

        </div>

    )

}

export default ModalCadastro