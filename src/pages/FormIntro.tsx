import { useState } from "react"
import FormLista from "../componentsPage/FormLista"
import ModalCadastro from "../modals/ModalCadastro"
import moment from 'moment'

const FormIntro = (props: any) => {

    const [show, setShow] = useState<boolean>(false)
    const [now, setNow] = useState<string | undefined>('')

    return (

        <div>


            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
					<div className="breadcrumb-title pe-3">Garantia</div>
					<div className="ps-3">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb mb-0 p-0">
								
								<li className="breadcrumb-item active" aria-current="page">{props.tipo}</li>
							</ol>
						</nav>
					</div>
					
				</div>

            <div className="col-md-12" style={{ marginBottom: 20}}>
                <div className="d-md-flex d-grid align-items-center gap-2">
                    
                    <button type="button" className="btn btn-primary" onClick={() => {setNow(moment().format('YYYY-MM-DD HH:mm:ss'));setShow(true)}}>+ Novo</button>
                    <button type="button" className="btn btn-success">Exportar XLSX</button>
                
                </div>
            </div>


            <FormLista tipo={props.tipo} show={show} setShow={setShow} now={now} setNow={setNow} />
            <ModalCadastro tipo={props.tipo} show={show} setShow={setShow} now={now} setNow={setNow} />

        </div>

    )


}

export default FormIntro