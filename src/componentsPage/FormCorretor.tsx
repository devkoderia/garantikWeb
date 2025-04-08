import React, { useEffect, useState, forwardRef, ReactElement } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import toast from 'react-hot-toast'
import { validaCPF, validaCNPJ, validaEmail } from '../components/generalFunctions'
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

interface IUF {
    uf_codigo: string;
    uf_descri: string;
}

interface IMunicipio {
    ibge_codigo: string;
    ibge_descri: string;
}

interface IProdutor {
    produtor_id: number;
    nomeConcatenado: string;
}

interface IBanco {
    banco_id: number;
    descricao: string;
}

interface INacionalidade {
    nacionalidade_id: number;
    descricao: string;
}


interface iClientes {

    cliente_id: number,
    nomeFantasia: string,
    cnpj: string,


}



const FormCorretor = (props: any) => {


    const [usuario_id_session, setUsuario_id_session] = useState<number | undefined>()


    const dadosUsuarios = sessionStorage.getItem('dadosUsuarios')

    useEffect(() => {

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
            
            carregaClientes()
            setUsuario_id_session(dados.usuario_id)

		    //setCliente_id(dados.cliente_id ? Number(dados.cliente_id) : undefined)
	

		}

	}, [dadosUsuarios])




    const [key, setKey] = useState<string | null>('dadosGerais');


    const [open, setOpen] = useState<boolean>(false);
    const [show, setShow] = useState(props.showDevolucao)

    const [acao, setAcao] = useState<string | undefined>('')

    const [titulo, setTitulo] = useState<string | undefined>('')
    const [frase, setFrase] = useState<string | undefined>('')



    const [cpf, setCPF] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [clienteUsuario_id, setClienteUsuario_id] = useState<number | undefined>()


    const [cliente_id, setCliente_id] = useState<number>()

    const [cnpj, setCnpj] = useState<string>('')
    const [nomeFantasia, setNomeFantasia] = useState<string>('')
    const [razaoSocial, setRazaoSocial] = useState<string>('')
    const [cep, setCep] = useState<string>('')
    const [ibge_codigo, setIbge_codigo] = useState<string>('')
    const [ibge_descri, setIbge_descri] = useState<string>('')
    const [municipios, setMunicipios] = useState<React.ReactNode[]>([])
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
    const [estadoCivil, setEstadoCivil] = useState<string>('')
    const [profissao, setProfissao] = useState<string>('')
    const [agencia, setAgencia] = useState<string>('')
    const [numeroConta, setNumeroConta] = useState<string>('')
    const [tipoConta, setTipoConta] = useState<string>('')
    const [chavePix, setChavePix] = useState<string>('')
    const [nomeCorrentista, setNomeCorrentista] = useState<string>('')
    const [cpfCorrentista, setCpfCorrentista] = useState<string>('')
    const [cnpjCorrentista, setCnpjCorrentista] = useState<string>('')
    const [ufs, setUfs] = useState<React.ReactNode[]>([])
    const [uf, setUf] = useState<string>('')
    const [produtores, setProdutores] = useState<React.ReactNode[]>([])
    const [produtor_id, setProdutor_id] = useState<number>()
    const [bancos, setBancos] = useState<React.ReactNode[]>([])
    const [banco_id, setBanco_id] = useState<number>()    
    const [nacionalidades, setNacionalidades] = useState<React.ReactNode[]>([])
    const [nacionalidade_id, setNacionalidade_id] = useState<number | undefined>(7)
    const [tipoJuridico, setTipoJuridico] = useState<string>('')



    const [clientes, setClientes] = useState<[]>([])


    const carregaClientes = () => {


        setClientes([])

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
            
            setClientes(dados.clientes)

		    //setCliente_id(dados.cliente_id ? Number(dados.cliente_id) : undefined)
	

		}

    }




    const listaNacionalidade = async () => {
        try {
            const resultado = await api.get<INacionalidade[]>('nacionalidades');
            setNacionalidades(resultado.data.map((rs: INacionalidade) =>
            
                <option key={rs.nacionalidade_id} value={rs.nacionalidade_id}>
                    {rs.descricao}
                </option>
            
            ));


        } catch (error) {
            console.error('Erro ao buscar Nacionalidades:', error);
        }
    };


    const listaProdutor = async () => {

        if (cliente_id) {


            var dataPost = {
                cliente_id: cliente_id,
            }

            try {
                const resultado = await api.post<IProdutor[]>(`produtorListaSelect`, dataPost);

                setProdutores(resultado.data.map((rs) =>
                
                    
                        <option key={rs.produtor_id} value={rs.produtor_id}>
                            {rs.nomeConcatenado}
                        </option>
                    
                
                ));

            } catch (error) {
                console.error('Erro ao buscar Produtores:', error);
            }
            
        }

    };


    const listaMunicipios = async () => {

        if (uf) {

            try {
                const resultado = await api.get<IMunicipio[]>(`listaMunicipios/${uf}`);
                setMunicipios(resultado.data.map((rs) =>
                
                    <option key={rs.ibge_codigo} value={rs.ibge_codigo}>
                        {rs.ibge_descri}
                    </option>
                
                
                ));
            } catch (error) {
                console.error('Erro ao buscar UFs:', error);
            }

        }

        
    };


    const listaUf = async () => {
        try {
            const resultado = await api.get<IUF[]>('listaUf');
            setUfs(resultado.data.map((rs) =>
                
                    <option key={rs.uf_codigo} value={rs.uf_codigo}>
                        {rs.uf_descri}
                    </option>
                
            
            ));
        } catch (error) {
            console.error('Erro ao buscar UFs:', error);
        }
    };

    const listaBanco = async () => {
        try {
            const resultado = await api.get<IBanco[]>('bancoListaTodos');
            setBancos(resultado.data.map((rs) =>
            
                <option key={rs.banco_id} value={rs.banco_id}>
                    {rs.descricao}
                </option>
            
            
            ));
        } catch (error) {
            console.error('Erro ao buscar UFs:', error);
        }
    };




    const consultaClienteUsuarioCpf = async () => {

        if (cliente_id) {

            var dataPost = {
                cliente_id: cliente_id,
            }
    
            const resultado = await api.post(`consultaClienteUsuarioCpf/${cpf.replaceAll('.', '').replaceAll('-', '')}`, dataPost)
            return resultado.data
    
        }

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

                //console.log(result.data)

                setLogradouro(result.data.logradouro)
                setComplemento(result.data.complemento)
                setBairro(result.data.bairro)
                setIbge_codigo(result.data.ibge)
                setIbge_descri(result.data.localidade)
                setUf(result.data.uf)

            }).catch((err) => {

                console.log(err.response)

            })

        }

    }


    const carregaCorretor = () => {


        var dataPost = {

            cliente_id: props.cliente_id,

        }

        api.post(`corretorListaUm/${props.corretor_id}`, dataPost).then((result) => {

            //console.log(result.data)

            var data = result.data[0]

            setCPF(data.cpf)
            setNome(data.nome)
            
            //setClienteUsuario_id(data.clienteUsuario_id)
            setCliente_id(data.cliente_id)
            setCnpj(data.cnpj)
            setNomeFantasia(data.nomeFantasia)
            setRazaoSocial(data.razaoSocial)
            setCep(data.cep)
            setIbge_codigo(data.ibge_codigo)
            setIbge_descri(data.ibge_descri)
            setMunicipios(data.municipios)
            setLogradouro(data.logradouro)
            setNumero(data.numero)
            setComplemento(data.complemento)
            setBairro(data.bairro)
            setTelefoneFixo(data.telefoneFixo)
            setTelefoneCelular(data.telefoneCelular)
            setEmail(data.email)
            setPessoaContato(data.pessoaContato)
            setEmailPessoaContato(data.emailPessoaContato)
            setTelefoneFixoPessoaContato(data.telefoneFixoPessoaContato)
            setTelefoneCelularPessoaContato(data.telefoneCelularPessoaContato)
            setObservacao(data.observacao)
            setComissaoPorcentagem(data.comissaoPorcentagem)
            setPremioMinimo(data.premioMinimo)
            setCnae(data.cnae)
            setCnaeDescricao(data.cnaeDescricao)
            setCapitalSocial(data.capitalSocial)
            setNaturezaJuridica(data.naturezaJuridica)
            setSituacao(data.situacao)
            setDataAbertura(data.dataAbertura)
            setTipoEmpresa(data.tipoEmpresa)
            setPorte(data.porte)
            setDataSituacao(data.dataSituacao)
            setMotivoSituacao(data.motivoSituacao)
            setSituacaoEspecial(data.situacaoEspecial)
            setDataSituacaoEspecial(data.dataSituacaoEspecial)
            setSusep(data.susep)
            setAd_usr(data.ad_usr)
            setEstadoCivil(data.estadoCivil)
            setProfissao(data.profissao)
            setAgencia(data.agencia)
            setNumeroConta(data.numeroConta)
            setTipoConta(data.tipoConta)
            setChavePix(data.chavePix)
            setNomeCorrentista(data.nomeCorrentista)
            setCpfCorrentista(data.cpfCorrentista)
            setCnpjCorrentista(data.cnpjCorrentista)
            setUfs(data.ufs)
            setUf(data.uf)
            setProdutores(data.produtores)
            setProdutor_id(data.produtor_id)
            setBancos(data.bancos)
            setBanco_id(data.banco_id)
            
            setNacionalidade_id(data.nacionalidade_id)
            setTipoJuridico(data.tipoJuridico)
            


        }).catch((err) => {

            console.log(err.response)

        })

    }

    useEffect(() => {

        limpa()
        
        
        if (props.corretor_id && props.cliente_id) {

            carregaCorretor()

        }

    }, [props.corretor_id, props.cliente_id])

    const validaSalvar = async () => {


        
        if (cnpjCorrentista.toString().length > 0) {

            if (!validaCNPJ(cnpjCorrentista.replaceAll('.', '').replaceAll('-', '').replaceAll('/', ''))) {

                toast.error('CNPJ inválido!')
                return false

            }

        }


        if (cpfCorrentista.toString().length > 0) {

            if (!validaCPF(cpfCorrentista.replaceAll('.', '').replaceAll('-', ''))) {

                toast.error('CPF inválido!')
                return false

            }

        }


        if (emailPessoaContato.toString().length > 0) {

            if (!validaEmail(emailPessoaContato)) {

                toast.error('E-mail inválido!')
                return false

            }

        }


        setTitulo('Confirmação')
        setFrase('Confirma salvar?')
        setOpen(true)



    



    }


    const salva = () => {

        setOpen(false)

        var dataPost = {

            cliente_id: props.cliente_id,
            
            cpf: cpf ? cpf.replaceAll('.', '').replaceAll('-', '') : null,
            nome: nome,
            
            cnpj: cnpj ? cnpj.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '') : null,
            nomeFantasia: nomeFantasia,
            razaoSocial: razaoSocial,
            cep: cep ? cep.replaceAll('-', '') : null,
            ibge_codigo: ibge_codigo,
            uf: uf,
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
            ad_usr: usuario_id_session,
            nacionalidade_id: nacionalidade_id,
            estadoCivil: estadoCivil,
            profissao: profissao,
            banco_id: banco_id,
            agencia: agencia,
            numeroConta: numeroConta,
            tipoConta: tipoConta,
            chavePix: chavePix,
            produtor_id: produtor_id,
            tipoJuridico: tipoJuridico,
            
            cpfCorrentista: cpfCorrentista ? cpfCorrentista.replaceAll('.', '').replaceAll('-', '') : null,
            cnpjCorrentista: cnpjCorrentista ? cnpjCorrentista.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '') : null,

        }

        //console.log(dataPost)
        //return false

        api.post('corretor', dataPost).then((result) => {

            if (result.data.status == 'ok') {

                setOpen(false)
                props.setShow(false)
                toast.success('Registro salvo com sucesso!')
                props.carregaCorretores()

            }

        }).catch((err) => {

            console.log(err.response)

        })

    }

    useEffect(() => {

        listaUf();
        listaBanco();
        listaNacionalidade();

    }, [])

    useEffect(() => {

        //limpa()

        if (cliente_id) {

            listaProdutor();

        }

    }, [cliente_id]);

    useEffect(() => {
        listaMunicipios();
    }, [uf]);


    const limpa = () => {

        

        setClienteUsuario_id(undefined)
        setCPF('')
        setNome('')
        setCnpj('')
        setNomeFantasia('')
        setRazaoSocial('')
        setCep('')
        setIbge_codigo('')
        setIbge_descri('')
        
        setLogradouro('')
        setNumero('')
        setComplemento('')
        setBairro('')
        setTelefoneFixo('')
        setTelefoneCelular('')
        setEmail('')
        setPessoaContato('')
        setEmailPessoaContato('')
        setTelefoneFixoPessoaContato('')
        setTelefoneCelularPessoaContato('')
        setObservacao('')
        setComissaoPorcentagem(undefined)
        setPremioMinimo(undefined)
        setCnae('')
        setCnaeDescricao('')
        setCapitalSocial('')
        setNaturezaJuridica('')
        setSituacao('')
        setDataAbertura('')
        setTipoEmpresa('')
        setPorte('')
        setDataSituacao('')
        setMotivoSituacao('')
        setSituacaoEspecial('')
        setDataSituacaoEspecial('')
        setSusep('')
        
        setEstadoCivil('')
        setProfissao('')
        setAgencia('')
        setNumeroConta('')
        setTipoConta('')
        setChavePix('')
        setNomeCorrentista('')
        setCpfCorrentista('')
        setCnpjCorrentista('')
        
        setUf('')
        setProdutores([])
        setProdutor_id(undefined)
        
        setBanco_id(undefined)        
        setNacionalidade_id(7)
        

    }

    


    return (

        <div>
            <div className="row g-3">

                <div className="col-md-6">
                        
                        <select className="form-control" value={cliente_id} 
                        onChange={event => setCliente_id(event.target.value ? Number(event.target.value) : undefined)} 
                        disabled={ props.corretor_id }
                        >
                            <option value="">[Emissor da garantia]</option>
                            {

                                clientes.map((rs: iClientes) => 
                                    
                                    <option value={rs.cliente_id}>{rs.cnpj} - {rs.nomeFantasia}</option>
                                )

                            }

                        </select>
                </div>
                <div className="col-md-6">
                    
                    <select  className="form-control" value={tipoJuridico} onChange={event => setTipoJuridico(event.target.value)} 
                    style={{ backgroundColor: '#f4f2ff'}}
                    disabled={ props.corretor_id }>
                        <option value="">[Informe o tipo jurídico]</option>
                        <option value="F">Pessoa Física</option>
                        <option value="J">Pessoa Jurídica</option>
                        <option value="O" style={{ display: props.tipo == 'Afiançado' ? 'table-row' : 'none'}}>Outro</option>

                    </select>
                </div>
                
                {
                    cliente_id && tipoJuridico && (



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
                                                    <input type="text" className="form-control" style={{ backgroundColor: '#e9f2f1' }} />
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
                                                    <input type="text" className="form-control" />
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

                                                <div className="col-md-2" style={{ display: tipoJuridico == 'F' ? 'table-row' : 'none' }}>
                                                    <label className="form-label">CPF</label>
                                                    <TextInput placeholder="000.000.0000-00" 
                                                    maskType="cpf" 
                                                    type="text" 
                                                    className="form-control" 
                                                    disabled={ props.corretor_id }
                                                    style={{ backgroundColor: '#e9f2f1' }} onBlur={verificaCPF} value={cpf} onChange={event => setCPF(event.target.value)} />
                                                </div>
                                                <div style={{ display: clienteUsuario_id || props.corretor_id ? 'none' : 'table-row' }}>
                                                    <div className="col-md-2 d-flex align-items-end" >

                                                        <button type="button" className="btn btn-info" onClick={verificaCPF}>Ok</button>

                                                    </div>
                                                </div>
                                                <div className="col-md-2" style={{ display: tipoJuridico == 'O' ? 'table-row' : 'none' }}>
                                                    <label className="form-label">Documento</label>
                                                    <input type="text" className="form-control" style={{ backgroundColor: '#e9f2f1' }} />
                                                </div>
                                                

                                                {
                                                    (clienteUsuario_id || props.corretor_id) &&
                                                    (

                                                        <>

                                                            <div className="col-md-10">
                                                                <label className="form-label">Nome</label>
                                                                <input type="text" className="form-control" value={nome} maxLength={250} onChange={event => setNome(event.target.value)} disabled />
                                                            </div>

                                                            <div className="col-md-3">
                                                                <label className="form-label">Nacionalidade</label>
                                                                <select
                                                                    className="form-control"
                                                                    value={nacionalidade_id}
                                                                    onChange={(e) => setNacionalidade_id(e.target.value ? Number(e.target.value) : undefined)}
                                                                >
                                                                    <option value="">[Selecione]</option>
                                                                    {nacionalidades}
                                                                </select>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <label className="form-label">Estado Civil</label>
                                                                <select className="form-control" value={estadoCivil} onChange={event => setEstadoCivil(event.target.value)} >
                                                                    <option value="">[Selecione]</option>
                                                                    <option value="Casado">Casado</option>
                                                                    <option value="Divorciado">Divorciado</option>
                                                                    <option value="Separado">Separado judicialmente</option>
                                                                    <option value="Solteiro">Solteiro</option>
                                                                    <option value="Viúvo">Viúvo</option>

                                                                </select>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <label className="form-label">Profissão</label>
                                                                <input type="text" className="form-control" value={profissao} onChange={event => setProfissao(event.target.value)} maxLength={150} />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <label className="form-label">SUSEP</label>
                                                                <input type="text" className="form-control" value={susep} onChange={event => setSusep(event.target.value)} maxLength={50} />
                                                            </div>

                                                        </>

                                                    )
                                                }

                                            </form>

                                        </Tab>

                                    )
                            }


                            {(clienteUsuario_id || props.corretor_id) && (

                                <Tab eventKey="dadosEndereco" title={
                                    <>
                                        <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                            <i className="material-icons-outlined">home</i>
                                            Endereço
                                        </div>
                                    </>
                                }>

                                    <form className="row g-3">
                                        <div className="col-md-2">
                                            <label className="form-label">CEP</label>
                                            <TextInput placeholder="00000-000" maskType="cep" type="text" className="form-control" value={cep} onChange={event => setCep(event.target.value)} onBlur={verificaCEP} />
                                        </div>
                                        <div className="col-md-7">
                                            <label className="form-label">Logradouro</label>
                                            <input type="text" className="form-control" value={logradouro} maxLength={500} onChange={event => setLogradouro(event.target.value)} />
                                        </div>

                                        <div className="col-md-3">
                                            <label className="form-label">Complemento</label>
                                            <input type="text" className="form-control" value={complemento} maxLength={100} onChange={event => setComplemento(event.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label">Bairro</label>
                                            <input type="text" className="form-control" value={bairro} maxLength={150} onChange={event => setBairro(event.target.value)} />
                                        </div>
                                        <div className="col-md-5">
                                            <label className="form-label">Município</label>
                                            <select
                                                className="form-control"
                                                value={ibge_codigo}
                                                onChange={(e) => setIbge_codigo(e.target.value)}
                                            >
                                                <option value="">[Selecione]</option>
                                                {municipios}
                                            </select>
                                        </div>

                                        <div className="col-md-3">
                                            <label className="form-label">UF</label>
                                            <select className="form-control"
                                                value={uf}
                                                onChange={(e) => setUf(e.target.value)}
                                            >

                                                <option value="">[Selecione]</option>
                                                {ufs}
                                            </select>
                                        </div>

                                    </form>


                                </Tab>

                            )}


                            {

                                (clienteUsuario_id || props.corretor_id) &&

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
                                                <label className="form-label">Produtor</label>
                                                <select className="form-control"
                                                    value={produtor_id}
                                                    onChange={(e) => setProdutor_id(Number(e.target.value))}
                                                >

                                                    <option value="">[Selecione]</option>
                                                    {produtores}
                                                </select>
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label">Comissão (%)</label>
                                                <input type="number" className="form-control" placeholder='Informe o percentual' value={comissaoPorcentagem} onChange={event => setComissaoPorcentagem(event.target.value ? Number(event.target.value) : undefined)} />
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label">Prêmio mínimo:</label>
                                                <input type="text" className="form-control" value={premioMinimo} onChange={event => setPremioMinimo(event.target.value ? Number(event.target.value) : undefined)} />
                                            </div>


                                        </form>

                                    </Tab>
                                )

                            }

                            {

                                (clienteUsuario_id || props.corretor_id) &&

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
                                                <label className="form-label">Banco</label>
                                                <select className="form-control"
                                                    value={banco_id}
                                                    onChange={(e) => setBanco_id(Number(e.target.value))}
                                                >

                                                    <option value="">[Selecione]</option>
                                                    {bancos}
                                                </select>
                                            </div>

                                            <div className="col-md-2">
                                                <label className="form-label">Agência</label>
                                                <input type="text" className="form-control" value={agencia} onChange={event => setAgencia(event.target.value ? String(event.target.value) : '')} />
                                            </div>

                                            <div className="col-md-3">
                                                <label className="form-label">Conta</label>
                                                <input type="text" className="form-control" value={numeroConta} onChange={event => setNumeroConta(event.target.value ? String(event.target.value) : '')} />
                                            </div>

                                            <div className="col-md-3">
                                                <label className="form-label">Tipo de Conta</label>
                                                <select className="form-control" value={tipoConta} onChange={event => setTipoConta(event.target.value ? String(event.target.value) : '')}>
                                                    <option value="">[Selecione]</option>
                                                    <option value="CC">Conta Corrente</option>
                                                    <option value="POU">Poupança</option>
                                                    <option value="PIX">PIX</option>
                                                </select>
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label">Chave PIX</label>
                                                <input type="text" className="form-control" value={chavePix} onChange={event => setChavePix(event.target.value ? String(event.target.value) : '')} />
                                            </div>

                                            <div className="col-md-8">
                                                <label className="form-label">Nome do Correntista</label>
                                                <input type="text" className="form-control" value={nomeCorrentista} onChange={event => setNomeCorrentista(event.target.value ? String(event.target.value) : '')} />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label">CPF do Correntista</label>
                                                <TextInput placeholder="000.000.0000-00" maskType="cpf" type="text" className="form-control" style={{ backgroundColor: '#e9f2f1' }} value={cpfCorrentista} onChange={event => setCpfCorrentista(event.target.value)} />
                                            </div>
                                            <div className="col-md-8">
                                                <label className="form-label">CNPJ do Correntista</label>
                                                <TextInput placeholder="00.000.000/0000-00" maskType="cnpj" type="text" className="form-control" style={{ backgroundColor: '#e9f2f1' }} value={cnpjCorrentista} onChange={event => setCnpjCorrentista(event.target.value)} />
                                            </div>

                                        </form>

                                    </Tab>
                                )
                            }


                            {

                                (clienteUsuario_id || props.corretor_id) && (

                                    <Tab eventKey="outrasInformacoes" title={
                                        <>
                                            <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                                <i className="material-icons-outlined">info</i>
                                                Outras Informações
                                            </div>
                                        </>
                                    }>

                                        <form className="row g-3">

                                            <div className="col-md-2">
                                                <label className="form-label">Tel Fixo</label>
                                                <TextInput placeholder="(00) 0000-0000" maskType="phoneFixo" type="text" className="form-control" value={telefoneFixo} onChange={event => setTelefoneFixo(event.target.value)} />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">Tel Celular</label>
                                                <TextInput placeholder="(00) 00000-0000" maskType="phone" type="text" className="form-control" value={telefoneCelular} onChange={event => setTelefoneCelular(event.target.value)} />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label">Contato</label>
                                                <input type="text" className="form-control" value={pessoaContato} onChange={event => setPessoaContato(event.target.value)} maxLength={150} />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label">E-mail</label>
                                                <input type="text" className="form-control" value={emailPessoaContato} onChange={event => setEmailPessoaContato(event.target.value)} maxLength={100} />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="form-label">Observação</label>
                                                <textarea rows={3} className="form-control" maxLength={1000} value={observacao} onChange={event => setObservacao(event.target.value)} />
                                            </div>

                                            <div className="col-md-2">
                                                <label className="form-label">Bloqueado</label>
                                                <select className="form-control">
                                                    <option value="">[Selecione]</option>
                                                    <option value="1">Sim</option>
                                                    <option value="0">Não</option>
                                                </select>
                                            </div>

                                        </form>

                                    </Tab>

                                )
                            }

                            


                        </Tabs>

                    )
                }
            
                



                <div className="col-md-12" style={{ marginTop: 50, textAlign: 'right' }}>
                    
                        <button type="button" className="btn btn-success" style={{ marginLeft: 5, display: clienteUsuario_id ? 'table-row' : 'none' }} onClick={validaSalvar}>Salvar</button>
                        <button type="button" className="btn btn-secondary" onClick={() => props.setShow(false)} style={{ marginLeft: 5 }}>Fechar</button>
                    
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

                    <div style={{ textAlign: 'justify' }}>
                        {frase}
                    </div>

                </DialogContent>
                <DialogActions>


                    <Button color="primary" variant="contained" onClick={() => setOpen(false)} style={{ display: acao == 'senhaAlterada' ? 'table-row' : 'none' }}>
                        Ok
                    </Button>


                    <Button color="error" variant="contained" onClick={() => setOpen(false)} style={{ display: acao == '' ? 'table-row' : 'none' }}>
                        Cancelar
                    </Button>
                    <Button color="success" variant="contained" onClick={() => salva()} style={{ display: acao == '' ? 'table-row' : 'none' }}>
                        Ok
                    </Button>


                </DialogActions>
            </Dialog>

        </div>

    )

}

export default FormCorretor