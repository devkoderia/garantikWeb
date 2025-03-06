import { useEffect, useState } from "react"
import FormCadastro from "../componentsPage/FormCadastro"

const FormEscolhe = (props: any) => {

    const [tipoJuridico, setTipoJuridico] = useState<string>('')


    return (

        <div>

            
                <form className="row g-3">
                    <div className="col-md-12">
                        
                        <select  className="form-control" value={tipoJuridico} onChange={event => setTipoJuridico(event.target.value)} style={{ backgroundColor: '#f4f2ff'}}>
                            <option value="">[Informe o tipo jurídico]</option>
                            <option value="F">Pessoa Física</option>
                            <option value="J">Pessoa Jurídica</option>
                            <option value="O" style={{ display: props.tipo == 'Afiançado' ? 'table-row' : 'none'}}>Outro</option>

                        </select>
                    </div>
                    
                </form>

                <div className="row" style={{ marginTop: 20, display: tipoJuridico ? 'block' : 'none'}}>
					


                                <FormCadastro tipoJuridico={tipoJuridico} tipo={props.tipo} />
                                
                                                    
            

                </div>


        </div>

    )

}

export default FormEscolhe