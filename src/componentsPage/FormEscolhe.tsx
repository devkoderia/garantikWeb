import { useEffect, useState } from "react"
import FormPF from "../componentsPage/FormPF"
import FormPJ from "../componentsPage/FormPJ"

const FormEscolhe = () => {

    const [tipoJuridico, setTipoJuridico] = useState<string>('')

    return (

        <div>


                <form className="row g-3">
                    <div className="col-md-12">
                        
                        <select  className="form-control" value={tipoJuridico} onChange={event => setTipoJuridico(event.target.value)} style={{ backgroundColor: '#f4f2ff'}}>
                            <option value="">[Informe o tipo jurídico]</option>
                            <option value="F">Pessoa Física</option>
                            <option value="J">Pessoa Jurídica</option>

                        </select>
                    </div>
                    
                </form>

                <div className="row" style={{ marginTop: 20, display: tipoJuridico ? 'block' : 'none'}}>
					<div className="col-12 col-xl-12">
                        <div className="card">
							<div className="card-body p-4">


                            {

                                tipoJuridico == 'F' ?
                                (
                                    <FormPF />
                                ) 
                                
                                :
                                
                                tipoJuridico == 'J' ?
                                
                                (

                                    <FormPJ />

                                )
                                
                                :

                                null

                            }
                            
                                
                                                    
            
                            </div>
                        </div>
                    </div>

                </div>


        </div>

    )

}

export default FormEscolhe