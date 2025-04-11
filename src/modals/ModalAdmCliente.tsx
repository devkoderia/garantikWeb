import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ClienteAdmCadastro from '../componentsPage/ClienteAdmCadastro'
import ClienteAdmCobranca from '../componentsPage/ClienteAdmCobranca'



const ModalAdmCliente = (props: any) => {

    const [key, setKey] = useState<string | null>('dadosGerais')
    const [show, setShow] = useState(props.show)

    useEffect(() => {

        
        setShow(props.show);
        //console.log(props)
        //setUsuario_id(props.usuario_id)
                
    }, [props.show, props.usuario_id, props.now]);



    return (

        <div>

            <Modal
                
                show={show}
                fullscreen={true}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-xl"
                dialogClassName="modal-fullscreen-fix"
                
                >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-xl">

                    Cliente

                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <div className="row g-3">

                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key ?? "dadosGerais"}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                        >


                            <Tab eventKey="dadosGerais" title={
                                
                                    <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                        <i
                                            className="material-icons-outlined">person_outline</i>
                                        Dados Empresariais

                                    </div>
                                
                            }>

                                <ClienteAdmCadastro setShow={props.setShow} />

                            </Tab>
                            <Tab eventKey="dadosCobranca" title={
                                <>
                                    <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                        <i className="material-icons-outlined">group</i>
                                        Dados para cobrança
                                    </div>
                                </>
                            }>

                                <ClienteAdmCobranca setShow={props.setShow} />


                            </Tab>
                            <Tab eventKey="dadosContato" title={
                                <>
                                    <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                        <i className="material-icons-outlined">group</i>
                                        Contato
                                    </div>
                                </>
                            }>

                                bbb


                            </Tab>
                            <Tab eventKey="dadosUsuarios" title={
                                <>
                                    <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                        <i className="material-icons-outlined">group</i>
                                        Usuários (0)
                                    </div>
                                </>
                            }>

                                bbb


                            </Tab>
                            <Tab eventKey="dadosPagamentos" title={
                                <>
                                    <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                        <i className="material-icons-outlined">group</i>
                                        Pagamentos (0)
                                    </div>
                                </>
                            }>

                                bbb


                            </Tab>
                            <Tab eventKey="dadosHistorico" title={
                                <>
                                    <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                        <i className="material-icons-outlined">book</i>
                                        Histórico (0)
                                    </div>
                                </>
                            }>

                                bbb


                            </Tab>

                    </Tabs>

                    </div>

                </Modal.Body>


            </Modal>


        </div>

    )

}

export default ModalAdmCliente