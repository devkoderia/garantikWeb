import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const FormPF = () => {

    
    const [key, setKey] = useState<string | null>('dadosGerais');


    return (

        <div>

            <form className="row g-3">
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
                                        className="material-icons-outlined">person_outline</i>
                                        Dados Pessoais
                            
                            </div>
                            </>
                        }>
                            


                            <form className="row g-3">
                                
                                <div className="col-md-2">
                                    <label className="form-label">CPF</label>
                                    <input type="text" className="form-control" style={{ backgroundColor: '#e9f2f1'}} />
                                </div>
                                <div className="col-md-10">
                                    <label  className="form-label">Nome</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-3">
                                    <label  className="form-label">Nacionalidade</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-3">
                                    <label  className="form-label">Estado Civil</label>
                                    <select className="form-control" >
                                        <option value="">[Selecione]</option>
                                        <option value="Casado">Casado</option>
                                        <option value="Solteiro">Solteiro</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label  className="form-label">Profissão</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-3">
                                    <label  className="form-label">SUSEP</label>
                                    <input type="text" className="form-control" />
                                </div>

                            </form>



                        </Tab>
                        <Tab eventKey="dadosEndereco" title={
                            <>
                            <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                <i
                                        className="material-icons-outlined">home</i>
                                        Endereço
                            
                            </div>
                            </>
                        }>
                            

                            <form className="row g-3">
                                <div className="col-md-2">
                                    <label  className="form-label">CEP</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-7">
                                    <label  className="form-label">Logradouro</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="col-md-3">
                                    <label  className="form-label">Complemento</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label  className="form-label">Bairro</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-5">
                                    <label  className="form-label">Município</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-3">
                                    <label  className="form-label">UF</label>
                                    <select className="form-control">
                                        <option value="">[Selecione]</option>
                                    </select>
                                </div>

                            </form>


                        </Tab>
                        <Tab eventKey="dadosFinanceiros" title={
                            <>
                            <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                <i
                                        className="material-icons-outlined">attach_money</i>
                                        Dados Financeiros
                            
                            </div>
                            </>
                        }>
                            
                            <form className="row g-3">
                                <div className="col-md-4">
                                    <label  className="form-label">Produtor</label>
                                    <select className="form-control">
                                        <option value="">[Selecione]</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label  className="form-label">Comissão (%)</label>
                                    <input type="text" className="form-control" placeholder='Informe o percentual' />
                                </div>
                                <div className="col-md-4">
                                    <label  className="form-label">Prêmio mínimo:</label>
                                    <input type="text" className="form-control" />
                                </div>
                                

                            </form>

                        </Tab>
                        <Tab eventKey="dadosBancarios" title={
                            <>
                            <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                <i
                                        className="material-icons-outlined">account_balance</i>
                                        Dados Bancários
                            
                            </div>
                            </>
                        }>
                            
                            <form className="row g-3">
                                <div className="col-md-4">
                                    <label  className="form-label">Banco</label>
                                    <select className="form-control">
                                        <option value="">[Selecione]</option>
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <label  className="form-label">Agência</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-2">
                                    <label  className="form-label">Conta</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label  className="form-label">Tipo de Conta</label>
                                    <select className="form-control">
                                        <option value="">[Selecione]</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label  className="form-label">Beneficiário</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="col-md-3">
                                    <label  className="form-label">CPF do Beneficiário</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-3">
                                    <label  className="form-label">CNPJ do Beneficiário</label>
                                    <input type="text" className="form-control" />
                                </div>
                                

                            </form>

                        </Tab>
                        <Tab eventKey="outrasInformacoes" title={
                            <>
                            <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                <i
                                        className="material-icons-outlined">info</i>
                                        Outras Informações
                            
                            </div>
                            </>
                        }>
                            
                            <form className="row g-3">
                               
                                <div className="col-md-2">
                                    <label  className="form-label">Tel Fixo</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-2">
                                    <label  className="form-label">Tel Celular</label>
                                    <input type="text" className="form-control" />
                                </div>
                                
                                <div className="col-md-4">
                                    <label  className="form-label">Contato</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="col-md-4">
                                    <label  className="form-label">E-mail</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-12">
                                    <label  className="form-label">Observação</label>
                                    <textarea rows={3} className="form-control" />
                                </div>

                                <div className="col-md-2">
                                    <label  className="form-label">Bloqueado</label>
                                    <select className="form-control">
                                        <option value="">[Selecione]</option>
                                        <option value="">Sim</option>
                                        <option value="">Não</option>
                                    </select>
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
            </form>

        </div>

    )

}

export default FormPF