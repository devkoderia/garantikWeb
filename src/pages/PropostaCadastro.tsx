import { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const PropostaCadastro = () => {

    const [key, setKey] = useState<string | null>('dadosGerais');

    return (

        <div>


            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">Proposta</div>
                <div className="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            
                            <li className="breadcrumb-item active" aria-current="page">Cadastro</li>
                        </ol>
                    </nav>
                </div>
                
            </div>

            <div className="row" style={{ marginTop: 20 }}>
                <div className="col-12 col-xl-12">
                    <div className="card">
                        <div className="card-body p-4">



                            <div className="row g-3">
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
                                                                Afiançado e Beneficiário
                                                        
                                                        </div>
                                                        </>
                                                    }>
                                                        


                                                        <form className="row g-3">
                                                            <div className="col-md-12">

                                                    

                                                            </div>
                                                            <div className="col-md-12">
                                                                <label className="form-label">Afiançado</label>
                                                                <input type="text" className="form-control" style={{ backgroundColor: '#e9f2f1'}} />
                                                            </div>
                                                            <div className="col-md-12">
                                                                <label className="form-label">Beneficiário</label>
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

                                <div className="col-md-12">
                                    <div className="d-md-flex d-grid align-items-center gap-2">
                                        <button type="button" className="btn btn-success">Salvar</button>
                                        
                                    </div>
                                </div>
                            </div>

                            



                        </div>

                        
                    </div>

                </div>

            </div>
            


        </div>

    )

}

export default PropostaCadastro