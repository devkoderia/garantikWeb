import { useEffect, useState } from "react"
import FormCorretor from "../componentsPage/FormCorretor"

const FormEscolhe = (props: any) => {


    interface iClientes {

        cliente_id: number,
        nomeFantasia: string,
        cnpj: string,


    }




    const [tipoJuridico, setTipoJuridico] = useState<string>('')


    const [cliente_id, setCliente_id] = useState<number | undefined>()
    const [clientes, setClientes] = useState<[]>([])


    const dadosUsuarios = sessionStorage.getItem('dadosUsuarios')

    useEffect(() => {

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
            
            setClientes(dados.clientes)

		    //setCliente_id(dados.cliente_id ? Number(dados.cliente_id) : undefined)
	

		}

	}, [dadosUsuarios])




    return (

        <div>

            
                <div className="row g-3">
                    <div className="col-md-6">
                            
                            <select className="form-control" value={cliente_id} onChange={event => setCliente_id(event.target.value ? Number(event.target.value) : undefined)} >
                                <option value="">[Emissor da garantia]</option>
                                {

                                    clientes.map((rs: iClientes) => 
                                        
                                        <option value={rs.cliente_id}>{rs.cnpj} - {rs.nomeFantasia}</option>
                                    )

                                }

                            </select>
                    </div>
                    <div className="col-md-6">
                        
                        <select  className="form-control" value={tipoJuridico} onChange={event => setTipoJuridico(event.target.value)} style={{ backgroundColor: '#f4f2ff'}}>
                            <option value="">[Informe o tipo jurídico]</option>
                            <option value="F">Pessoa Física</option>
                            <option value="J">Pessoa Jurídica</option>
                            <option value="O" style={{ display: props.tipo == 'Afiançado' ? 'table-row' : 'none'}}>Outro</option>

                        </select>
                    </div>
                    
                </div>

                <div className="row" style={{ marginTop: 20, display: tipoJuridico ? 'block' : 'none'}}>
					
                        {
                            props.tipo == 'Corretor' && (

                                <FormCorretor tipoJuridico={tipoJuridico} cliente_id={cliente_id} setShow={props.setShow} />
                            )
                        }


                </div>


        </div>

    )

}

export default FormEscolhe