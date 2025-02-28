import { useEffect, useState } from "react"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const ProdutorCadastro = () => {


    const [key, setKey] = useState<string | null>('dadosPessoais');


    return (


        <div>


                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
					<div className="breadcrumb-title pe-3">Garantia</div>
					<div className="ps-3">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb mb-0 p-0">
								
								<li className="breadcrumb-item active" aria-current="page">Produtor</li>
							</ol>
						</nav>
					</div>
					
				</div>




                <div className="row" >
					<div className="col-12 col-xl-12">
                        <div className="card">
							<div className="card-body p-4">


                                            
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key ?? "dadosPessoais"}                                                
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                    >
                                    <Tab eventKey="dadosPessoais" title="Dados pessoais">
                                        


                                        <form className="row g-3">
                                            <div className="col-md-12">

                                    

                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label">CPF</label>
                                                <input type="text" className="form-control" style={{ backgroundColor: '#e9f2f1'}} />
                                            </div>
                                            <div className="col-md-9">
                                                <label  className="form-label">Nome</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">CEP</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <label  className="form-label">Logradouro</label>
                                                <input type="text" className="form-control" />
                                            </div>

                                            <div className="col-md-3">
                                                <label  className="form-label">Complemento</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <label  className="form-label">Município</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">UF</label>
                                                <select className="form-control">
                                                    <option value="">[Selecione]</option>
                                                </select>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="d-md-flex d-grid align-items-center gap-2">
                                                    <button type="button" className="btn btn-success">Salvar</button>
                                                    
                                                </div>
                                            </div>
                                            
                                        </form>



                                    </Tab>
                                    <Tab eventKey="dadosProfissionais" title="Dados profissionais">
                                        

                                        Conteúdo tab #2


                                    </Tab>
                                    <Tab eventKey="dadosContato" title="Contato">
                                        
                                        Conteúdo tab #3

                                    </Tab>
                                </Tabs>
                                                    
            
                            </div>
                        </div>
                    </div>

                </div>





        </div>



    )

}


export default ProdutorCadastro