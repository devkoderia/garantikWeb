import { useState, useEffect } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


interface iClientes {

    cliente_id: number,
    nomeFantasia: string,
    cnpj: string,


}


const FormEmissao = (props: any) => {

    const [key, setKey] = useState<string | null>('dadosGerais');
    const [usuario_id_session, setUsuario_id_session] = useState<number | undefined>()
    const [cliente_id, setCliente_id] = useState<number>()    
    const [clientes, setClientes] = useState<[]>([])

    const dadosUsuarios = sessionStorage.getItem('dadosUsuarios')



    useEffect(() => {

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
            
            carregaClientes()
            setUsuario_id_session(dados.usuario_id)

		    //setCliente_id(dados.cliente_id ? Number(dados.cliente_id) : undefined)
	

		}

	}, [dadosUsuarios])

    


    const carregaClientes = () => {


        setClientes([])

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
            
            setClientes(dados.clientes)
            setCliente_id(dados.clientes.length == 1 ? dados.clientes[0].cliente_id : undefined)
		    //setCliente_id(dados.cliente_id ? Number(dados.cliente_id) : undefined)
	

		}

    }




    const validaSalvar = () => {


    }

    return (

        <div>

            
            <div className="row g-3">

                <div className="col-md-12">

                    <select className="form-control" value={cliente_id} disabled={ clientes.length > 1 ? false : true } onChange={event => setCliente_id(event.target.value ? Number(event.target.value) : undefined)} >
                        { clientes.length > 1 && ( <option value="">[Selecione]</option> )}
                        
                        {

                            clientes.map((rs: iClientes) => 
                                
                                <option value={rs.cliente_id}>{rs.cnpj} - {rs.nomeFantasia}</option>
                            )

                        }

                    </select>
                </div>
                <div className="col-md-12">

                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key ?? "dadosGerais"}                                                
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                        >

                                    <Tab eventKey="dadosGerais" title={
                                        <>
                                        <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                            <i
                                                className="material-icons-outlined">group</i>
                                                Tomador e Favorecido
                                        
                                        </div>
                                        </>
                                    }>
                                        


                                        <form className="row g-3">
                                            <div className="col-md-12">

                                    

                                            </div>
                                            <div className="col-md-12">
                                                <label className="form-label">Tomador</label>
                                                <input type="text" className="form-control" style={{ backgroundColor: '#e9f2f1'}} />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="form-label">Favorecido</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            

                                        

                                            
                                        </form>



                                    </Tab>


                                    <Tab eventKey="informacoes" title={
                                        <>
                                        <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                            <i
                                                    className="material-icons-outlined">info</i>
                                                    Informações
                                        
                                        </div>
                                        </>
                                    }>
                                        
                                        <form className="row g-3">
                                    
                                            <div className="col-md-2">
                                                <label  className="form-label">Data emissão</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Início da vigência</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            
                                            <div className="col-md-2">
                                                <label  className="form-label">Dias</label>
                                                <input type="text" className="form-control" />
                                            </div>

                                            <div className="col-md-2">
                                                <label  className="form-label">Final da vigência</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label  className="form-label">Valor segurado</label>
                                                <input type="text" className="form-control" />
                                            </div>

                                            <div className="col-md-6">
                                                <label  className="form-label">Modalidade</label>
                                                <select className="form-control">
                                                    
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Multas</label>
                                                <select className="form-control" >
                                                    <option value="">[Selecione]</option>
                                                    <option value="">Sim</option>
                                                    <option value="">Não</option>
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Trabalhista e previdenciário</label>
                                                <select className="form-control" >
                                                    <option value="">[Selecione]</option>
                                                    <option value="">Sim</option>
                                                    <option value="">Não</option>
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Fiscal e tributário</label>
                                                <select className="form-control" >
                                                    <option value="">[Selecione]</option>
                                                    <option value="">Sim</option>
                                                    <option value="">Não</option>
                                                </select>
                                            </div>
                                            

                                        </form>

                                    </Tab>
                                    <Tab eventKey="premio" title={
                                        <>
                                        <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                            <i
                                                    className="material-icons-outlined">emoji_events</i>
                                                    Prêmio e Comissão
                                        
                                        </div>
                                        </>
                                    }>
                                        
                                        <form className="row g-3">
                                    
                                            <div className="col-md-3">
                                                <label  className="form-label">Valor do prêmio</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Taxa aplicada (%)</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <label  className="form-label">Valor da comissão</label>
                                                <input type="text" className="form-control" />
                                            </div>

                                            <div className="col-md-3">
                                                <label  className="form-label">% de comissão</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Valor do spread</label>
                                                <input type="text" className="form-control" />
                                            </div>


                                        </form>

                                    </Tab>
                                    <Tab eventKey="historico" title={
                                        <>
                                        <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                            <i
                                                    className="material-icons-outlined">schedule</i>
                                                    Histórico
                                        
                                        </div>
                                        </>
                                    }>
                                        
                                        <form className="row g-3">
                                    
                                            <div className="col-md-12">
                                                <label  className="form-label">Observações do corretor</label>
                                                <textarea rows={3} className="form-control" />
                                            </div>
                                            <div className="col-md-12">
                                                <label  className="form-label">Observações do subscritor</label>
                                                <textarea rows={3} className="form-control" />
                                            </div>


                                        </form>

                                    </Tab>



                    </Tabs>

                </div>

                

                <div className="col-md-12" style={{ marginTop: 50, textAlign: 'right' }}>


                        <button type="button" className="btn btn-secondary" onClick={() => props.setShow(false)} style={{ marginLeft: 5 }}>Fechar</button>
                        <button type="button" className="btn btn-success" style={{ marginLeft: 5, }} onClick={validaSalvar}>Salvar</button>

                    </div>
                </div>

        </div>

    )
}

export default FormEmissao