import { useEffect, useState, forwardRef, ReactElement } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import toast from 'react-hot-toast'
import { validaCPF, validaCNPJ } from '../components/generalFunctions'
import TextInput from '../components/TextInput'
import api from '../components/api';
import axios from 'axios'

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
	props: TransitionProps & { children: ReactElement<any, any> },
	ref
  ) {
	return <Slide direction="up" ref={ref} {...props} />;
  });



const FormCorretor = (props: any) => {

    const [key, setKey] = useState<string | null>('dadosGerais');


    const [open, setOpen] = useState<boolean>(false);        
    const [show, setShow] = useState(props.showDevolucao)
    
    const [acao, setAcao] = useState<string | undefined>('')

    const [titulo, setTitulo] = useState<string | undefined>('')
    const [frase, setFrase] = useState<string | undefined>('')



    const tipoJuridico = props.tipoJuridico
    const tipo = props.tipo

    const [cpf, setCPF] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [clienteUsuario_id, setClienteUsuario_id] = useState<number | undefined>()


    const [cliente_id, setCliente_id] = useState<number>()        
    const [cnpj, setCnpj] = useState<string>('')    
    const [nomeFantasia, setNomeFantasia] = useState<string>('')
    const [razaoSocial, setRazaoSocial] = useState<string>('')
    const [cep, setCep] = useState<string>('')
    const [ibge_codigo, setIbge_codigo] = useState<string>('')
    //const [ibge_descri, setIbge_descri] = useState() : Joi.string().allow(null).allow('').max(250),
    //const [uf, setuf] = useState() : Joi.string().allow(null).allow('').max(2),
    const [logradouro, setLogradouro] = useState<string>('')
    const [numero, setNumero] = useState<string>('')
    const [complemento, setComplemento] = useState<string>('')
    const [bairro, setBairro] = useState<string>('')
    const [telefoneFixo, setTelefoneFixo] = useState<string>('')
    const [telefoneCelular, setTelefoneCelular] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [pessoaContato, setPessoaContato] = useState<string>('')
    const [emailPessoaContato, setEmailPessoaContato] = useState<string>('')
    const [telefoneFixoPessoaContato, setTelefoneFixoPessoaContato] = useState<string>('')
    const [telefoneCelularPessoaContato, setTelefoneCelularPessoaContato] = useState<string>('')
    const [observacao, setObservacao] = useState<string>('')
    const [comissaoPorcentagem, setComissaoPorcentagem] = useState<number>()
    const [premioMinimo, setPremioMinimo] = useState<number>()
    const [cnae, setCnae] = useState<string>('')
    const [cnaeDescricao, setCnaeDescricao] = useState<string>('')
    const [capitalSocial, setCapitalSocial] = useState<string>('')
    const [naturezaJuridica, setNaturezaJuridica] = useState<string>('')
    const [situacao, setSituacao] = useState<string>('')
    const [dataAbertura, setDataAbertura] = useState<string>('')
    //const [dataUltimaAtualizacao, setDataUltimaAtualizacao] = useState() : Joi.string().allow(null).allow('').max(50),
    const [tipoEmpresa, setTipoEmpresa] = useState<string>('')
    const [porte, setPorte] = useState<string>('')
    const [dataSituacao, setDataSituacao] = useState<string>('')
    const [motivoSituacao, setMotivoSituacao] = useState<string>('')
    const [situacaoEspecial, setSituacaoEspecial] = useState<string>('')
    const [dataSituacaoEspecial, setDataSituacaoEspecial] = useState<string>('')
    const [susep, setSusep] = useState<string>('')
    const [ad_usr, setAd_usr] = useState<number>()

    const [nacionalidade, setNacionalidade] = useState<string>('')
    const [estadoCivil, setEstadoCivil] = useState<string>('')
    const [profissao, setProfissao] = useState<string>('')


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

    const verificaCEP = () => {

        

        if (cep.length >= 8) {

            

            axios.get(`https://viacep.com.br/ws/${cep.replaceAll('-', '')}/json`).then((result) => {

                console.log(result.data)
                setLogradouro(result.data.logradouro)
                setComplemento(result.data.complemento)
                setBairro(result.data.bairro)
            
            }).catch((err) => {

                console.log(err.response)

            })

        }

    }


    const validaSalvar = () => {


        setTitulo('Confirmação')
        setFrase('Confirma salvar?')
        setOpen(true)


    }


    const salva = () => {


        var dataPost = {

            cliente_id: cliente_id,
            cnpj: cnpj,
            nomeFantasia: nomeFantasia,
            razaoSocial: razaoSocial,
            cep: cep,
            ibge_codigo: ibge_codigo,
            logradouro: logradouro,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            telefoneFixo: telefoneFixo,
            telefoneCelular: telefoneCelular,
            email: email,
            pessoaContato: pessoaContato,
            emailPessoaContato: emailPessoaContato,
            telefoneFixoPessoaContato: telefoneFixoPessoaContato,
            telefoneCelularPessoaContato: telefoneCelularPessoaContato,
            observacao: observacao,
            comissaoPorcentagem: comissaoPorcentagem,
            premioMinimo: premioMinimo,
            cnae: cnae,
            cnaeDescricao: cnaeDescricao,
            capitalSocial: capitalSocial,
            naturezaJuridica: naturezaJuridica,
            situacao: situacao,
            dataAbertura: dataAbertura,
            tipoEmpresa: tipoEmpresa,
            porte: porte,
            dataSituacao: dataSituacao,
            motivoSituacao: motivoSituacao,
            situacaoEspecial: situacaoEspecial,
            dataSituacaoEspecial: dataSituacaoEspecial,
            susep: susep,
            ad_usr: ad_usr,

            //const [ibge_descri, setIbge_descri] = useState() : Joi.string().allow(null).allow('').max(250),
            //const [uf, setuf] = useState() : Joi.string().allow(null).allow('').max(2),
            //const [dataUltimaAtualizacao, setDataUltimaAtualizacao] = useState() : Joi.string().allow(null).allow('').max(50),

        }
    
        console.log(dataPost)



    }




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
                                                        <input type="text" className="form-control" value={nome} maxLength={250} onChange={event => setNome(event.target.value)} disabled />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label  className="form-label">Nacionalidade</label>
                                                        <input type="text" className="form-control" value={nacionalidade} onChange={event => setNacionalidade(event.target.value)} maxLength={100} />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label  className="form-label">Estado Civil</label>
                                                        <select className="form-control" value={estadoCivil} onChange={event => setEstadoCivil(event.target.value)} >
                                                            <option value="">[Selecione]</option>
                                                            <option value="Casado">Casado</option>
                                                            <option value="Solteiro">Solteiro</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label  className="form-label">Profissão</label>
                                                        <input type="text" className="form-control" value={profissao} onChange={event => setProfissao(event.target.value)} maxLength={150} />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label  className="form-label">SUSEP</label>
                                                        <input type="text" className="form-control" value={susep} onChange={event => setSusep(event.target.value)} maxLength={50} />
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
                                        <TextInput placeholder="00000-000" maskType="cep" type="text" className="form-control" value={cep} onChange={event => setCep(event.target.value)} onBlur={verificaCEP} />
                                    </div>
                                    <div className="col-md-7">
                                        <label  className="form-label">Logradouro</label>
                                        <input type="text" className="form-control" value={logradouro} maxLength={500} onChange={event => setLogradouro(event.target.value)} />
                                    </div>

                                    <div className="col-md-3">
                                        <label  className="form-label">Complemento</label>
                                        <input type="text" className="form-control" value={complemento} maxLength={100} onChange={event => setComplemento(event.target.value)} />
                                    </div>
                                    <div className="col-md-4">
                                        <label  className="form-label">Bairro</label>
                                        <input type="text" className="form-control" value={bairro} maxLength={150} onChange={event => setBairro(event.target.value)} />
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
                                                <input type="number" className="form-control" placeholder='Informe o percentual' value={comissaoPorcentagem} onChange={event => setComissaoPorcentagem(event.target.value ? Number(event.target.value) : undefined)} />
                                            </div>
                                            <div className="col-md-4">
                                                <label  className="form-label">Prêmio mínimo:</label>
                                                <input type="text" className="form-control" value={premioMinimo} onChange={event => setPremioMinimo(event.target.value ? Number(event.target.value) : undefined)} />
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
                                                <input type="text" className="form-control" value={telefoneFixo} onChange={event => setTelefoneFixo(event.target.value)} maxLength={100} />
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Tel Celular</label>
                                                <input type="text" className="form-control" value={telefoneCelular} onChange={event => setTelefoneCelular(event.target.value)} maxLength={100}  />
                                            </div>
                                            
                                            <div className="col-md-4">
                                                <label  className="form-label">Contato</label>
                                                <input type="text" className="form-control" value={pessoaContato} onChange={event => setPessoaContato(event.target.value)} maxLength={150}/>
                                            </div>
        
                                            <div className="col-md-4">
                                                <label  className="form-label">E-mail</label>
                                                <input type="text" className="form-control" value={email} onChange={event => setEmail(event.target.value)} maxLength={100} />
                                            </div>
                                            <div className="col-md-12">
                                                <label  className="form-label">Observação</label>
                                                <textarea rows={3} className="form-control" maxLength={1000} value={observacao} onChange={event => setObservacao(event.target.value)} />
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



                    <div className="col-md-12" style={{ marginTop: 50, display: clienteUsuario_id ? 'table-row' : 'none'}}>
                        <div className="d-md-flex d-grid align-items-center gap-2">
                            <button type="button" className="btn btn-success" onClick={validaSalvar}>Salvar</button>
                            
                        </div>
                    </div>
            </div>

            <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="xs"
                    fullWidth 
                    >
                    <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
                    <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
                        
                        <div style={{ textAlign: 'justify'}}>
                        {frase}
                        </div>

                    </DialogContent>
                    <DialogActions>


                        <Button color="primary" variant="contained" onClick={() => setOpen(false)} style={{ display: acao == 'senhaAlterada' ? 'table-row' : 'none'}}>
                            Ok
                        </Button>
                        

                        <Button color="error" variant="contained" onClick={() => setOpen(false)} style={{ display: acao == '' ? 'table-row' : 'none'}}>
                            Cancelar
                        </Button>
                        <Button color="success" variant="contained" onClick={() => salva()} style={{ display: acao == '' ? 'table-row' : 'none'}}>
                            Ok
                        </Button>
                

                    </DialogActions>
                </Dialog>

        </div>

    )

}

export default FormCorretor