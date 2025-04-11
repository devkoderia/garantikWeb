import React, { useEffect, useState, forwardRef, ReactElement } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import toast from 'react-hot-toast'
import { validaCPF, validaCNPJ, validaEmail } from '../components/generalFunctions'
import TextInput from '../components/TextInput'
import api from '../components/api';
import axios from 'axios'
import moment from 'moment'
import { useForm, Controller } from "react-hook-form";
import CurrencyInput from '../components/CurrencyInput';

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


const FormTomador = (props: any) => {


    const { control, handleSubmit } = useForm({
        defaultValues: {
          limiteGeral: "",
          limiteTomado: "",
          limiteTradicional: "",
          limiteRecursal: "",
          limiteFinanceira: "",
          limiteJudicial: "",
          limiteEstruturada: "",
        },
      });


    const [usuario_id_session, setUsuario_id_session] = useState<number | undefined>()
    const [key, setKey] = useState<string | null>('dadosGerais')
    const [open, setOpen] = useState<boolean>(false)
    const [acao, setAcao] = useState<string | undefined>('')
    const [titulo, setTitulo] = useState<string | undefined>('')
    const [frase, setFrase] = useState<string | undefined>('')
    const [validadoCNPJ, setValidadoCNPJ] = useState<boolean>(false)
    const [clientes, setClientes] = useState<[]>([])
    const [nome, setNome] = useState<string>('')
    const [clienteUsuario_id, setClienteUsuario_id] = useState<number | undefined>()
    const [cliente_id, setCliente_id] = useState<number>()    
    const [validadoCPF, setValidadoCPF] = useState<boolean>(false)
    
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

    const [nacionalidades, setNacionalidades] = useState<React.ReactNode[]>([])
    const [nacionalidade_id, setNacionalidade_id] = useState<number | undefined>(7)
    const [tipoJuridico, setTipoJuridico] = useState<string>('')
    const [bloqueado, setBloqueado] = useState<number | undefined>()

    const [cnae, setCnae] = useState<string>('')
    const [cnaeDescricao, setCnaeDescricao] = useState<string>('')
    const [capitalSocial, setCapitalSocial] = useState<string>('')
    const [naturezaJuridica, setNaturezaJuridica] = useState<string>('')
    const [situacao, setSituacao] = useState<string>('')
    const [dataAbertura, setDataAbertura] = useState<string>('')
    const [dataUltimaAtualizacao, setDataUltimaAtualizacao] = useState<string | undefined>()
    const [tipoEmpresa, setTipoEmpresa] = useState<string>('')
    const [porte, setPorte] = useState<string>('')
    const [dataSituacao, setDataSituacao] = useState<string>('')
    const [motivoSituacao, setMotivoSituacao] = useState<string>('')
    const [situacaoEspecial, setSituacaoEspecial] = useState<string>('')
    const [dataSituacaoEspecial, setDataSituacaoEspecial] = useState<string>('')
    const [ufs, setUfs] = useState<React.ReactNode[]>([])
    const [uf, setUf] = useState<string>('')
    const [estadoCivil, setEstadoCivil] = useState<string>('')
    const [profissao, setProfissao] = useState<string>('')
    const [cpf, setCPF] = useState<string>('')

    const [pessoaContato, setPessoaContato] = useState<string>('')
    const [emailPessoaContato, setEmailPessoaContato] = useState<string>('')
    const [telefoneFixoPessoaContato, setTelefoneFixoPessoaContato] = useState<string>('')
    const [telefoneCelularPessoaContato, setTelefoneCelularPessoaContato] = useState<string>('')
    const [observacao, setObservacao] = useState<string>('')

    const dadosUsuarios = sessionStorage.getItem('dadosUsuarios')

    const [limiteGeral, setLimiteGeral] = useState<string | undefined>()
    const [limiteTomado, setLimiteTomado] = useState<string | undefined>()
    const [limiteTradicional, setLimiteTradicional] = useState<string | undefined>()
    const [taxaTradicional, setTaxaTradicional] = useState<number | undefined>()
    const [limiteRecursal, setLimiteRecursal] = useState<string | undefined>()
    const [taxaRecursal, setTaxaRecursal] = useState<number | undefined>()
    const [limiteFinanceira, setLimiteFinanceira] = useState<string | undefined>()
    const [taxaFinanceira, setTaxaFinanceira] = useState<number | undefined>()
    const [limiteJudicial, setLimiteJudicial] = useState<string | undefined>()
    const [taxaJudicial, setTaxaJudicial] = useState<number | undefined>()
    const [limiteEstruturada, setLimiteEstruturada] = useState<string | undefined>()
    const [taxaEstruturada, setTaxaEstruturada] = useState<number | undefined>()
    const [restricao, setRestricao] = useState<number | undefined>()
    const [aprovado, setAprovado] = useState<number | undefined>()

    const [outroDocumento, setOutroDocumento] = useState<string | undefined>()
    const [outroDocumentoDescricao, setOutroDocumentoDescricao] = useState<string | undefined>()


    useEffect(() => {

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
            
            carregaClientes()
            setUsuario_id_session(dados.usuario_id)
            setCliente_id(dados.clientes.length == 1 ? dados.clientes[0].cliente_id : undefined)
		    //setCliente_id(dados.cliente_id ? Number(dados.cliente_id) : undefined)
	

		}

	}, [dadosUsuarios])

    


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



    const consultaCNPJ = async () => {

        try {

            var resultado = await api.get(`consultaCNPJ/${cnpj.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '')}`)
            return resultado.data

        } catch (err) {

            return err

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
                setValidadoCPF(true)
                setNome(data.nome)
                setClienteUsuario_id(data.clienteUsuario_id)

            }

        }

    }





    const verificaCNPJ = async () => {


        if (!validaCNPJ(cnpj.replaceAll('.', '').replaceAll('-', '').replaceAll('/', ''))) {

            toast.error('CNPJ inválido!')
            return false

        } else {

            var data = await consultaCNPJ()

            if (data) {

                setValidadoCNPJ(true)
                setRazaoSocial(data.nome)
                setNomeFantasia(data.fantasia)
                setNaturezaJuridica(data.natureza_juridica)
                setTipoEmpresa(data.tipo)
                setPorte(data.porte)
                setCapitalSocial(
                    data.capital_social
                        ? Number(data.capital_social).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })
                        : ''
                )

                setCnae(data.atividade_principal[0].code)
                setCnaeDescricao(data.atividade_principal[0].text)
                setSituacao(data.situacao)
                setDataSituacao(data.data_situacao)
                setMotivoSituacao(data.motivo_situacao)
                setSituacaoEspecial(data.situacao_especial)
                setDataSituacaoEspecial(data.data_situacao_especial)
                setDataAbertura(data.abertura)
                setDataUltimaAtualizacao(data.ultima_atualizacao ? moment(data.ultima_atualizacao).utc().format('DD/MM/YYYY HH:mm:ss') : undefined)

                setLogradouro(data.logradouro)
                setNumero(data.numero)
                setBairro(data.bairro)
                setComplemento(data.complemento)
                setUf(data.uf)
                setCep(data.cep ? data.cep.replaceAll('.', '') : '')

                verificaCEP(data.cep ? data.cep.replaceAll('.', '') : '')

            }


        }


    }



    const consultaClienteUsuarioCpf = async () => {

        if (cliente_id) {

            var dataPost = {
                cliente_id: cliente_id,
            }

            try {

                const resultado = await api.post(`consultaClienteUsuarioCpf/${cpf.replaceAll('.', '').replaceAll('-', '')}`, dataPost)
                return resultado.data
            } catch (err) {

                console.log(err)

            }
            
            

        }

    }



    const verificaCEP = (cep: string) => {



        if (cep.replaceAll('-', '').replaceAll('.', '').length >= 8) {

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


    const validaSalvar = () => {




        if (emailPessoaContato) {

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

            cliente_id: cliente_id,
            
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
            ibge_descri: ibge_descri,
            telefoneFixo: telefoneFixo,
            telefoneCelular: telefoneCelular,
            email: email,
            pessoaContato: pessoaContato,
            emailPessoaContato: emailPessoaContato,
            telefoneFixoPessoaContato: telefoneFixoPessoaContato,
            telefoneCelularPessoaContato: telefoneCelularPessoaContato,
            observacao: observacao,
            
            // dados financeiros
            tipoJuridico: tipoJuridico,

            cnae: cnae,
            cnaeDescricao: cnaeDescricao,
            capitalSocial: capitalSocial ? capitalSocial.toString().replaceAll('.', '').replaceAll(',', '.') : null,
            naturezaJuridica: naturezaJuridica,
            situacao: situacao,
            dataAbertura: dataAbertura ? moment(dataAbertura, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
            tipoEmpresa: tipoEmpresa,
            porte: porte,
            dataSituacao: dataSituacao ? moment(dataSituacao, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
            motivoSituacao: motivoSituacao,
            situacaoEspecial: situacaoEspecial,
            dataSituacaoEspecial: dataSituacaoEspecial ? moment(dataSituacaoEspecial, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
            
            ad_usr: usuario_id_session,
            nacionalidade_id: nacionalidade_id,
            estadoCivil: estadoCivil,
            profissao: profissao,            
            

            limiteGeral: limiteGeral ? limiteGeral.toString().replaceAll('.', '').replaceAll(',', '.') : null,
            limiteTomado: limiteTomado ? limiteTomado.toString().replaceAll('.', '').replaceAll(',', '.') : null,
            limiteTradicional: limiteTradicional ? limiteTradicional.toString().replaceAll('.', '').replaceAll(',', '.') : null,
            taxaTradicional: taxaTradicional ? taxaTradicional.toString().replaceAll('.', '').replaceAll(',', '.') : null,
            limiteRecursal: limiteRecursal ? limiteRecursal.toString().replaceAll('.', '').replaceAll(',', '.') : null,
            taxaRecursal: taxaRecursal ? taxaRecursal.toString().replaceAll('.', '').replaceAll(',', '.') : null,
            limiteFinanceira: limiteFinanceira ? limiteFinanceira.toString().replaceAll('.', '').replaceAll(',', '.') : null,
            taxaFinanceira: taxaFinanceira ? taxaFinanceira.toString().replaceAll('.', '').replaceAll(',', '.') : null,
            limiteJudicial: limiteJudicial ? limiteJudicial.toString().replaceAll('.', '').replaceAll(',', '.') : null,
            taxaJudicial: taxaJudicial ? taxaJudicial.toString().replaceAll('.', '').replaceAll(',', '.') : null,
            limiteEstruturada: limiteEstruturada ? limiteEstruturada.toString().replaceAll('.', '').replaceAll(',', '.') : null,
            taxaEstruturada: taxaEstruturada ? taxaEstruturada.toString().replaceAll('.', '').replaceAll(',', '.') : null,
            
            restricao: restricao === 1 ? true : restricao === 0 ? false : null,
            aprovado: aprovado === 1 ? true : aprovado === 0 ? false : null,
            bloqueado: bloqueado === 1 ? true : bloqueado === 0 ? false : null,
            dataUltimaAtualizacao: dataUltimaAtualizacao ? moment(dataUltimaAtualizacao, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') : null,

            outroDocumento: outroDocumento ? outroDocumento : null,
            outroDocumentoDescricao: outroDocumentoDescricao ? outroDocumentoDescricao : null,

        }


        if (props.tomador_id) {


            api.put(`tomador/${props.tomador_id}`, dataPost).then((result) => {

                //console.log(result.data)

                if (result.data.status == 'ok') {


                    setOpen(false)
                    //props.setShow(false)
                    toast.success('Registro salvo com sucesso!')
                    props.carregaTomadores()
                    //console.log('aqui')

                }

            }).catch((err) => {

                console.log(err.response)

            })


        } else {


            api.post('tomador', dataPost).then((result) => {

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


    }




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


    const carregaTomador = () => {

        var dataPost = {

            cliente_id: props.cliente_id,

        }

        

        api.post(`tomadorListaUm/${props.tomador_id}`, dataPost).then((result) => {

            //console.log(result.data)

            var data = result.data[0]

            setCPF(data.cpf)
            setNome(data.nome)
            
            setCliente_id(data.cliente_id)
            setCnpj(data.cnpj)
            setNomeFantasia(data.nomeFantasia)
            setRazaoSocial(data.razaoSocial)
            setCep(data.cep)
            setIbge_codigo(data.ibge_codigo)
            setIbge_descri(data.ibge_descri)
            
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
            setEstadoCivil(data.estadoCivil)
            setProfissao(data.profissao)
            setUf(data.uf)

            if (typeof data.restricao === 'boolean') {
                setRestricao(data.restricao ? 1 : 0);
            } else {
                setRestricao(undefined);
            }
            
            setNacionalidade_id(data.nacionalidade_id)
            setTipoJuridico(data.tipoJuridico)
            setDataUltimaAtualizacao(data.dataUltimaAtualizacao)
            

            if (typeof data.bloqueado === 'boolean') {
                setBloqueado(data.bloqueado ? 1 : 0);
            } else {
                setBloqueado(undefined);
            }
            

            setLimiteGeral(data.limiteGeral)
            setLimiteTomado(data.limiteTomado)
            setLimiteTradicional(data.limiteTradicional)
            setTaxaTradicional(data.taxaTradicional)
            setLimiteRecursal(data.limiteRecursal)
            setTaxaRecursal(data.taxaRecursal)
            setLimiteFinanceira(data.limiteFinanceira)
            setTaxaFinanceira(data.taxaFinanceira)
            setLimiteJudicial(data.limiteJudicial)
            setTaxaJudicial(data.taxaJudicial)
            setLimiteEstruturada(data.limiteEstruturada)
            setTaxaEstruturada(data.taxaEstruturada)
            
            
            setAprovado(data.aprovado ? data.aprovado == true ? 1 : data.aprovado == false ? 0 : undefined : undefined)

            setOutroDocumento(data.outroDocumento)
            setOutroDocumentoDescricao(data.outroDocumentoDescricao)
            


        }).catch((err) => {

            console.log(err.response)

        })

    }



    const limpa = () => {

        setCPF('')
        setNome('')
        //setCliente_id(undefined)
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
        setEstadoCivil('')
        setProfissao('')
        setUf('')
        setRestricao(undefined)
        setNacionalidade_id(undefined)
        setTipoJuridico('')
        setDataUltimaAtualizacao('')
        setBloqueado(undefined)
        setLimiteGeral('')
        setLimiteTomado('')
        setLimiteTradicional('')
        setTaxaTradicional(undefined)
        setLimiteRecursal('')
        setTaxaRecursal(undefined)
        setLimiteFinanceira('')
        setTaxaFinanceira(undefined)
        setLimiteJudicial('')
        setTaxaJudicial(undefined)
        setLimiteEstruturada('')
        setTaxaEstruturada(undefined)
        setAprovado(undefined)
        setOutroDocumento(undefined)
        setOutroDocumentoDescricao(undefined)


    }

    useEffect(() => {

        limpa()
        
        
        if (props.tomador_id != null && props.cliente_id != null) {

            carregaTomador()

        }

    }, [props.tomador_id, props.cliente_id, props.now])


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

    useEffect(() => {

        listaUf();
        listaNacionalidade();

    }, [])


    useEffect(() => {
        listaMunicipios();
    }, [uf]);

    useEffect(() => {

        console.log(cliente_id, 'cliente_id')

    }, [cliente_id])



    return (

        <div>

            <div className="row g-3">

                <div className="col-md-6">

                    <select className="form-control" value={cliente_id} disabled={ clientes.length > 1 ? false : true } onChange={event => setCliente_id(event.target.value ? Number(event.target.value) : undefined)} >
                        { clientes.length > 1 && ( <option value="">[Selecione]</option> )}
                        
                        {

                            clientes.map((rs: iClientes) => 
                                
                                <option value={rs.cliente_id}>{rs.cnpj} - {rs.nomeFantasia}</option>
                            )

                        }

                    </select>
                </div>
                <div className="col-md-6">

                    <select className="form-control" value={tipoJuridico} onChange={event => setTipoJuridico(event.target.value)}
                        style={{ backgroundColor: '#f4f2ff' }}
                        disabled={props.tomador_id}>
                        <option value="">[Informe o tipo jurídico]</option>
                        <option value="F">Pessoa Física</option>
                        <option value="J">Pessoa Jurídica</option>
                        <option value="O">Outro</option>

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

                                                <div className="col-md-3">
                                                    <label className="form-label">CNPJ</label>
                                                    <TextInput placeholder="00.000.000/0000-00"
                                                        maskType="cnpj"
                                                        type="text"
                                                        className="form-control"
                                                        disabled={props.produtor_id}
                                                        style={{ backgroundColor: '#e9f2f1' }} onBlur={verificaCNPJ} value={cnpj} onChange={event => setCnpj(event.target.value)} />
                                                </div>
                                                <div className="col-md-9">
                                                    <label className="form-label">Razão Social</label>
                                                    <input type="text" className="form-control" value={razaoSocial} disabled />
                                                </div>
                                                <div className="col-md-12">
                                                    <label className="form-label">Nome Fantasia</label>
                                                    <input type="text" className="form-control" value={nomeFantasia} disabled />
                                                </div>

                                                <div className="col-md-12">
                                                    <label className="form-label">Natureza Jurídica</label>
                                                    <input type="text" className="form-control" disabled value={naturezaJuridica} />
                                                </div>

                                                <div className="col-md-4">
                                                    <label className="form-label">Tipo da Empresa</label>
                                                    <input type="text" className="form-control" disabled value={tipoEmpresa} />
                                                </div>

                                                <div className="col-md-4">
                                                    <label className="form-label">Porte</label>
                                                    <input type="text" className="form-control" disabled value={porte} />
                                                </div>

                                                <div className="col-md-4">
                                                    <label className="form-label">Capital Social R$</label>
                                                    <input type="text" className="form-control" disabled value={capitalSocial} />
                                                </div>

                                                <div className="col-md-3">
                                                    <label className="form-label">CNAE</label>
                                                    <input type="text" className="form-control" disabled value={cnae} />
                                                </div>
                                                <div className="col-md-9">
                                                    <label className="form-label">Descrição do CNAE</label>
                                                    <input type="text" className="form-control" disabled value={cnaeDescricao} />
                                                </div>

                                                <div className="col-md-3">
                                                    <label className="form-label">Situação</label>
                                                    <input type="text" className="form-control" disabled value={situacao} />
                                                </div>

                                                <div className="col-md-3">
                                                    <label className="form-label">Data da situação</label>
                                                    <input type="text" className="form-control" disabled value={dataSituacao} />
                                                </div>

                                                <div className="col-md-3">
                                                    <label className="form-label">Motivo da situação</label>
                                                    <input type="text" className="form-control" disabled value={motivoSituacao} />
                                                </div>

                                                <div className="col-md-3">
                                                    <label className="form-label">Situação especial</label>
                                                    <input type="text" className="form-control" disabled value={situacaoEspecial} />
                                                </div>

                                                <div className="col-md-3">
                                                    <label className="form-label">Data da situação especial</label>
                                                    <input type="text" className="form-control" disabled value={dataSituacaoEspecial} />
                                                </div>

                                                <div className="col-md-3">
                                                    <label className="form-label">Data de abertura</label>
                                                    <input type="text" className="form-control" disabled value={dataAbertura} />
                                                </div>

                                                <div className="col-md-3">
                                                    <label className="form-label">Última atualização na receita</label>
                                                    <input type="text" className="form-control" disabled value={dataUltimaAtualizacao} />
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



                                            <div className="row g-3">

                                                <div className="col-md-4" style={{ display: tipoJuridico == 'F' ? 'table-row' : 'none' }}>
                                                    <label className="form-label">CPF</label>
                                                    <TextInput placeholder="000.000.0000-00"
                                                        maskType="cpf"
                                                        type="text"
                                                        className="form-control"
                                                        disabled={props.produtor_id}
                                                        style={{ backgroundColor: '#e9f2f1' }} onBlur={verificaCPF} value={cpf} onChange={event => setCPF(event.target.value)} />
                                                </div>

                                                <div className="col-md-2" style={{ display: tipoJuridico == 'O' ? 'table-row' : 'none' }}>
                                                    <label className="form-label">Tipo Documento</label>
                                                    <input type="text" className="form-control" style={{ backgroundColor: '#e9f2f1' }} maxLength={150} value={outroDocumentoDescricao} onChange={event => setOutroDocumentoDescricao(event.target.value)} />
                                                </div>

                                                <div className="col-md-2" style={{ display: tipoJuridico == 'O' ? 'table-row' : 'none' }}>
                                                    <label className="form-label">Documento</label>
                                                    <input type="text" className="form-control" style={{ backgroundColor: '#e9f2f1' }} maxLength={150} value={outroDocumento} onChange={event => setOutroDocumento(event.target.value)} />
                                                </div>




                                                <div className="col-md-8">
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
                                                <div className="col-md-6">
                                                    <label className="form-label">Profissão</label>
                                                    <input type="text" className="form-control" value={profissao} onChange={event => setProfissao(event.target.value)} maxLength={150} />
                                                </div>
                                             

                                            </div>

                                        </Tab>

                                    )
                            }


                            {(validadoCPF == true || props.tomador_id || validadoCNPJ == true) && (

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
                                            <TextInput placeholder="00000-000" maskType="cep" type="text" className="form-control" value={cep} onChange={event => setCep(event.target.value)} onBlur={event => verificaCEP(event.target.value)} />
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

                                (validadoCPF == true || props.tomador_id || validadoCNPJ == true) &&

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

                                        <div className="row g-3">


                                            <div className="col-md-3">
                                                <label  className="form-label">Aprovado</label>
                                                <select className="form-control" value={aprovado} onChange={event => setAprovado(event.target.value ? Number(event.target.value) : undefined)}>
                                                    <option value="">[Selecione]</option>
                                                    <option value={1}>Sim</option>
                                                    <option value={0}>Não</option>
                                                </select>
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Possui restrição?</label>
                                                <select className="form-control" value={restricao} onChange={event => setRestricao(event.target.value ? Number(event.target.value) : undefined)}>
                                                    <option value="">[Selecione]</option>
                                                    <option value={1}>Sim</option>
                                                    <option value={0}>Não</option>
                                                </select>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <label  className="form-label">Limite Geral R$</label>
                                                <Controller
                                                    name="limiteGeral"
                                                    control={control}
                                                    render={({ field }) => (
                                                    <CurrencyInput
                                                        value={limiteGeral}
                                                        onValueChange={(value) => field.onChange(value)} // Atualiza corretamente no RHF
                                                        onChange={event => setLimiteGeral(event.target.value)}
                                                        placeholder="Digite um valor"
                                                        className="form-control"
                                                        
                                                    />
                                                    )}
                                                />
                                            </div>
        
                                            <div className="col-md-3">
                                                <label  className="form-label">Limite tomado R$</label>
                                                <Controller
                                                    name="limiteTomado"
                                                    control={control}
                                                    render={({ field }) => (
                                                    <CurrencyInput
                                                        value={limiteTomado}
                                                        onValueChange={(value) => field.onChange(value)} // Atualiza corretamente no RHF
                                                        onChange={event => setLimiteTomado(event.target.value)}
                                                        placeholder="Digite um valor"
                                                        className="form-control"
                                                        
                                                    />
                                                    )}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Limite tradicional R$</label>
                                                <Controller
                                                    name="limiteTradicional"
                                                    control={control}
                                                    render={({ field }) => (
                                                    <CurrencyInput
                                                        value={limiteTradicional}
                                                        onValueChange={(value) => field.onChange(value)} // Atualiza corretamente no RHF
                                                        onChange={event => setLimiteTradicional(event.target.value)}
                                                        placeholder="Digite um valor"
                                                        className="form-control"
                                                        
                                                    />
                                                    )}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Taxa tradicional (%)</label>
                                                <input type="number" className="form-control" value={taxaTradicional} onChange={event => setTaxaTradicional(event.target.value ? Number(event.target.value) : undefined)} />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Limite Recursal R$</label>
                                                <Controller
                                                    name="limiteRecursal"
                                                    control={control}
                                                    render={({ field }) => (
                                                    <CurrencyInput
                                                        value={limiteRecursal}
                                                        onValueChange={(value) => field.onChange(value)} // Atualiza corretamente no RHF
                                                        onChange={event => setLimiteRecursal(event.target.value)}
                                                        placeholder="Digite um valor"
                                                        className="form-control"
                                                        
                                                    />
                                                    )}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Taxa Recursal (%)</label>
                                                <input type="number" className="form-control" value={taxaRecursal} onChange={event => setTaxaRecursal(event.target.value ? Number(event.target.value) : undefined)} />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Limite financeira R$</label>
                                                <Controller
                                                    name="limiteFinanceira"
                                                    control={control}
                                                    render={({ field }) => (
                                                    <CurrencyInput
                                                        value={limiteFinanceira}
                                                        onValueChange={(value) => field.onChange(value)} // Atualiza corretamente no RHF
                                                        onChange={event => setLimiteFinanceira(event.target.value)}
                                                        placeholder="Digite um valor"
                                                        className="form-control"
                                                        
                                                    />
                                                    )}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Taxa financeira (%)</label>
                                                <input type="number" className="form-control" value={taxaFinanceira} onChange={event => setTaxaFinanceira(event.target.value ? Number(event.target.value) : undefined)} />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Limite judicial R$</label>
                                                <Controller
                                                    name="limiteJudicial"
                                                    control={control}
                                                    render={({ field }) => (
                                                    <CurrencyInput
                                                        value={limiteJudicial}
                                                        onValueChange={(value) => field.onChange(value)} // Atualiza corretamente no RHF
                                                        onChange={event => setLimiteJudicial(event.target.value)}
                                                        placeholder="Digite um valor"
                                                        className="form-control"
                                                        
                                                    />
                                                    )}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Taxa judicial (%)</label>
                                                <input type="number" className="form-control" value={taxaJudicial} onChange={event => setTaxaJudicial(event.target.value ? Number(event.target.value) : undefined)} />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Limite estruturada R$</label>
                                                <Controller
                                                    name="limiteEstruturada"
                                                    control={control}
                                                    render={({ field }) => (
                                                    <CurrencyInput
                                                        value={limiteEstruturada}
                                                        onValueChange={(value) => field.onChange(value)} // Atualiza corretamente no RHF
                                                        onChange={event => setLimiteEstruturada(event.target.value)}
                                                        placeholder="Digite um valor"
                                                        className="form-control"
                                                        
                                                    />
                                                    )}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Taxa estruturada (%)</label>
                                                <input type="number" className="form-control" value={taxaEstruturada} onChange={event => setTaxaEstruturada(event.target.value ? Number(event.target.value) : undefined)} />
                                            </div>


                                        </div>

                                    </Tab>
                                )

                            }

                            {

                            (validadoCPF == true || props.tomador_id || validadoCNPJ == true) && (

                                <Tab eventKey="outrasInformacoes" title={
                                    <>
                                        <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                            <i className="material-icons-outlined">info</i>
                                            Outras Informações
                                        </div>
                                    </>
                                }>

                                    <div className="row g-3">

                                        <div className="col-md-2">
                                            <label className="form-label">Tel Fixo</label>
                                            <TextInput placeholder="(00) 0000-0000" maskType="phoneFixo" type="text" className="form-control" value={telefoneFixoPessoaContato} onChange={event => setTelefoneFixoPessoaContato(event.target.value)} />
                                        </div>
                                        <div className="col-md-2">
                                            <label className="form-label">Tel Celular</label>
                                            <TextInput placeholder="(00) 00000-0000" maskType="phone" type="text" className="form-control" value={telefoneCelularPessoaContato} onChange={event => setTelefoneCelularPessoaContato(event.target.value)} />
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
                                                <select className="form-control" value={bloqueado} onChange={event => setBloqueado(event.target.value ? Number(event.target.value) : undefined)}>
                                                    <option value="">[Selecione]</option>
                                                    <option value="1">Sim</option>
                                                    <option value="0">Não</option>
                                                </select>
                                            </div>



                                    </div>

                                </Tab>

                            )
                            }




                        </Tabs>

                    )
                }





                <div className="col-md-12" style={{ marginTop: 50, textAlign: 'right' }}>


                    <button type="button" className="btn btn-secondary" onClick={() => props.setShow(false)} style={{ marginLeft: 5 }}>Fechar</button>
                    <button type="button" className="btn btn-success" style={{ marginLeft: 5, display: validadoCPF == true || props.tomador_id || validadoCNPJ == true ? 'table-row' : 'none' }} onClick={validaSalvar}>Salvar</button>

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

export default FormTomador