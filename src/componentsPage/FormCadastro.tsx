import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import toast from 'react-hot-toast'
import { validaCPF, validaCNPJ } from '../components/generalFunctions'
import TextInput from '../components/TextInput'
import api from '../components/api';

const FormCadastro = (props: any) => {

    const [key, setKey] = useState<string | null>('dadosGerais');

    const tipoJuridico = props.tipoJuridico
    const tipo = props.tipo

    const [cpf, setCPF] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [clienteUsuario_id, setClienteUsuario_id] = useState<number | undefined>()

    const consultaClienteUsuarioCpf = async () => {

        var dataPost = {

            cliente_id: props.cliente_id,

        }

        const resultado = await api.post(`consultaClienteUsuarioCpf/${cpf.replaceAll('.', '').replaceAll('-', '')}`, dataPost)
        return resultado.data

    }


    const verificaCPF = async () => {

        if (!validaCPF(cpf.replaceAll('.', '').replaceAll('-', ''))) {

            toast.error('CPF inválido!')
            return false

        } else {

            var resultado = await consultaClienteUsuarioCpf()
            
            if (resultado.length > 0) {

                var data = resultado[0]

                setNome(data.nome)                
                setClienteUsuario_id(data.clienteUsuario_id)

            }

        }


    }

    useEffect(() => {

        console.log(clienteUsuario_id)

    }, [clienteUsuario_id])
    


    return (

        <div>
                <div className="row g-3">
                    <div className="col-md-12">

                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key ?? "dadosGerais"}                                                
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                            >


                            {

                                tipoJuridico == 'J' ?

                                (

                                        <Tab eventKey="dadosGerais" title={
                                        <>
                                        <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                            <i
                                                    className="material-icons-outlined">person_outline</i>
                                                    Dados Empresariais
                                        
                                        </div>
                                        </>
                                    }>
                                        


                                        <div className="row g-3">
                                            
                                            <div className="col-md-2">
                                                <label className="form-label">CNPJ</label>
                                                <input type="text" className="form-control" style={{ backgroundColor: '#e9f2f1'}} />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label">Razão Social</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-5">
                                                <label className="form-label">Nome Fantasia</label>
                                                <input type="text" className="form-control" />
                                            </div>

                                            <div className="col-md-3">
                                                <label className="form-label">Natureza Jurídica</label>
                                                <input type="text" className="form-control" disabled />
                                            </div>

                                            <div className="col-md-3">
                                                <label className="form-label">Tipo da Empresa</label>
                                                <input type="text" className="form-control" disabled />
                                            </div>

                                            <div className="col-md-3">
                                                <label className="form-label">Porte</label>
                                                <input type="text" className="form-control" disabled />
                                            </div>

                                            <div className="col-md-3">
                                                <label className="form-label">Capital Social</label>
                                                <input type="text" className="form-control" disabled />
                                            </div>

                                            <div className="col-md-2">
                                                <label className="form-label">CNAE</label>
                                                <input type="text" className="form-control" disabled />
                                            </div>
                                            <div className="col-md-10">
                                                <label className="form-label">Descrição do CNAE</label>
                                                <input type="text" className="form-control" disabled />
                                            </div>

                                            <div className="col-md-3">
                                                <label className="form-label">Situação</label>
                                                <input type="text" className="form-control" disabled />
                                            </div>

                                            <div className="col-md-3">
                                                <label className="form-label">Data da situação</label>
                                                <input type="text" className="form-control" disabled />
                                            </div>

                                            <div className="col-md-3">
                                                <label className="form-label">Motivo da situação</label>
                                                <input type="text" className="form-control" disabled />
                                            </div>

                                            <div className="col-md-3">
                                                <label className="form-label">Situação especial</label>
                                                <input type="text" className="form-control" disabled />
                                            </div>

                                            <div className="col-md-3">
                                                <label className="form-label">Data da situação especial</label>
                                                <input type="text" className="form-control" disabled />
                                            </div>

                                            <div className="col-md-3">
                                                <label className="form-label">Data de abertura</label>
                                                <input type="text" className="form-control" disabled />
                                            </div>

                                            <div className="col-md-3">
                                                <label className="form-label">Última atualização na receita</label>
                                                <input type="text" className="form-control" disabled />
                                            </div>

                                            <div className="col-md-3">
                                                <label className="form-label">SUSEP</label>
                                                <input type="text" className="form-control"  />
                                            </div>

                                        

                                            
                                        </div>



                                    </Tab>

                                )


                            : 

                            (

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
                                        
                                        <div className="col-md-2" style={{ display: tipoJuridico == 'F' ? 'table-row' : 'none'}}>
                                            <label className="form-label">CPF</label>
                                            <TextInput placeholder="000.000.0000-00" maskType="cpf" type="text" className="form-control" style={{ backgroundColor: '#e9f2f1'}} onBlur={verificaCPF} value={cpf} onChange={event => setCPF(event.target.value)} />
                                        </div>
                                        <div  style={{ display: clienteUsuario_id ? 'none' : 'table-row'}}>
                                            <div className="col-md-2 d-flex align-items-end" >
                                                
                                                <button type="button" className="btn btn-info" onClick={verificaCPF}>Ok</button>
                                                
                                            </div>
                                        </div>
                                        <div className="col-md-2" style={{ display: tipoJuridico == 'O' ? 'table-row' : 'none'}}>
                                            <label className="form-label">Documento</label>
                                            <input type="text" className="form-control" style={{ backgroundColor: '#e9f2f1'}} />
                                        </div>

                                        {
                                            clienteUsuario_id &&
                                            (

                                                <>
                                                
                                                    <div className="col-md-10">
                                                        <label  className="form-label">Nome</label>
                                                        <input type="text" className="form-control" value={nome} onChange={event => setNome(event.target.value)} disabled />
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
                                                
                                                </>

                                            )
                                        }

                                        
        
                                    </form>
        
        
        
                                </Tab>

                            )
                        }


                        {clienteUsuario_id && (

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

                        )}
                            

                        {

                            clienteUsuario_id && tipo != 'Afiançado' &&

                            (

                                

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
                                    )
                                    
                                }

                                {

                                    clienteUsuario_id && tipo != 'Afiançado' &&

                                    (

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
                                    )

                                
                            }

                             
                            {

                                clienteUsuario_id && (

                                    
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

                                )
                            }
                            
                            
                            

                            {

                                tipo == 'Afiançado' ?

                                (
                                    <Tab eventKey="Financeiro" title={
                                        <>
                                        <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                            <i
                                                    className="material-icons-outlined">payment</i>
                                                    Financeiro
                                        
                                        </div>
                                        </>
                                    }>
                                        
                                        <form className="row g-3">
                                       
                                            <div className="col-md-2">
                                                <label  className="form-label">Aprovado</label>
                                                <select className="form-control" >
                                                    <option value="">[Selecione]</option>
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Possui restrição?</label>
                                                <select className="form-control" >
                                                    <option value="">[Selecione]</option>
                                                </select>
                                            </div>
                                            
                                            <div className="col-md-2">
                                                <label  className="form-label">Limite Geral</label>
                                                <input type="text" className="form-control" />
                                            </div>
        
                                            <div className="col-md-2">
                                                <label  className="form-label">Limite tomado</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Limite tradicional</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Taxa tradicional (%)</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Limite Recursal</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Taxa Recursal (%)</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Limite financeira</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Limite judicial</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Limite estruturada</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Taxa estruturada (%)</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            
                                            
        
                                        </form>
        
                                    </Tab>
                                ) : null

                            }


                        </Tabs>

                    </div>



                    <div className="col-md-12" style={{ display: clienteUsuario_id ? 'table-row' : 'none'}}>
                        <div className="d-md-flex d-grid align-items-center gap-2">
                            <button type="button" className="btn btn-success">Salvar</button>
                            
                        </div>
                    </div>
            </div>

        </div>

    )

}

export default FormCadastro