import React, { useState, useEffect, forwardRef, ReactElement } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import api from "../components/api";
import { Link } from 'react-router-dom'
import toast from "react-hot-toast";
import Badge from 'react-bootstrap/Badge';
import { useForm, Controller } from "react-hook-form";
import moment from 'moment'
import CurrencyInput from '../components/CurrencyInput';
import TextInput from '../components/TextInput';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import { ptBR } from "date-fns/locale";

import JoditEditorComponent from "../components/JoditEditorComponent";


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


interface iClientes {

    cliente_id: number,
    nomeFantasia: string,
    cnpj: string,


}

interface iMoedas {

    moeda_id: number,
    descricao: string,

}

interface iTomador {

    tomador_id: number,
    cnpj: string,
    cpf: string,
    nome: string,
    nomeFantasia: string,
    tipoJuridico: string,
    outroDocumento: string,
    tomador: string,

}


interface iFavorecido {

    favorecido_id: number,
    cnpj: string,
    cpf: string,
    nome: string,
    nomeFantasia: string,
    tipoJuridico: string,
    outroDocumento: string,
    favorecido: string,

}

interface iModalidades {

    modalidade_id: string,
    descricao: string,

}


const FormEmissao = (props: any) => {


    const [key, setKey] = useState<string | null>('dadosGerais');
    const [usuario_id_session, setUsuario_id_session] = useState<number | undefined>()
    const [cliente_id, setCliente_id] = useState<number>()    
    const [clientes, setClientes] = useState<[]>([])

    const dadosUsuarios = sessionStorage.getItem('dadosUsuarios')


    const [resultadoTomador, setResultadoTomador] = useState<React.ReactNode>()
    const [tomador_id, setTomador_id] = useState<number | undefined>()
    const [tomador, setTomador] = useState<string | undefined>('')
    const [colorTomador, setColorTomador] = useState<string>('#FFF')

    const [resultadoFavorecido, setResultadoFavorecido] = useState<React.ReactNode>()
    const [favorecido_id, setFavorecido_id] = useState<number | undefined>()
    const [favorecido, setFavorecido] = useState<string | undefined>('')
    const [colorFavorecido, setColorFavorecido] = useState<string>('#FFF')

    const [startDate, setDate] = useState(new Date());
    const [startDate2, setDate2] = useState(new Date());

    const [dias, setDias] = useState<number | undefined>()
    const [dataVencimento, setDataVencimento] = useState(new Date());

    const [moedas, setMoedas] = useState<iMoedas[]>([])
    const [moeda_id, setMoeda_id] = useState<number | undefined>()
    
    const [dataEmissao, setDataEmissao] = useState<string>('')
    const [dataInicio, setDataInicio] = useState<string>('')    
    
    const [dataVencimentoIndeterminado, setDataVencimentoIndeterminado] = useState<string>('')
    
    const [valor, setValor] = useState<string | undefined>('')
    //const [premio, setValorPremio] = useState<string | undefined>('')
    const [valorComissao, setValorComissao] = useState<string | undefined>('')
    const [valorSpread, setValorSpread] = useState<string | undefined>('')
    const [objeto, setObjeto] = useState<string>('')
    
    const [modalidadeTexto, setModalidadeTexto] = useState<string>('')
    const [taxa, setTaxa] = useState<number | undefined>()
    const [premio, setPremio] = useState<string>('')
    const [pago, setPago] = useState<string>('')
    const [valorPago, setValorPago] = useState<string>('')
    const [minuta, setMinuta] = useState<string>('')
    const [garantia, setGarantia] = useState<string>('')
    
    const [multa, setMulta] = useState<string>('')
    const [textoMulta, setTextoMulta] = useState<string>('')

    const [juros, setJuros] = useState<string>('')

    const [textoFiscal, setTextoFiscal] = useState<string>('')
    const [fiscal, setFiscal] = useState<string>('')
    const [trabalhista, setTrabalhista] = useState<string>('')    
    const [textoTrabalhista, setTextoTrabalhista] = useState<string>('')
    
    const [sinistro, setSinistro] = useState<string>('')
    const [bloqueada, setBloqueada] = useState<string>('')
    //const [ad_usr, setAd_usr] = useState<string>('')

    const [percentualComissao, setPercentualComissao] = useState<number | undefined>()

    const [modalidade_id, setModalidade_id] = useState<number | undefined>()
    const [modalidades, setModalidades] = useState<React.ReactNode>()

    const [tomadores, setTomadores] = useState<iTomador[]>([])
    const [tomadoresTabela, setTomadoresTabela] = useState<React.ReactNode>()
    const [totalTomadores, setTotalTomadores] = useState<number>(0)

    const [favorecidos, setFavorecidos] = useState<iFavorecido[]>([])
    const [favorecidosTabela, setFavorecidosTabela] = useState<React.ReactNode>()
    const [totalFavorecidos, setTotalFavorecidos] = useState<number>(0)
    const [observacoesCorretor, setObservacoesCorretor] = useState<string>('')
    const [observacoesSubscritor, setObservacoesSubscritor] = useState<string>('')

    const [open, setOpen] = useState<boolean>(false)
    const [acao, setAcao] = useState<string | undefined>('')
    const [titulo, setTitulo] = useState<string | undefined>('')
    const [frase, setFrase] = useState<string | undefined>('')

    

    
    const { control, handleSubmit } = useForm({
        defaultValues: {
          valor: "",
          premio: "",
          valorComissao: "",
          valorSpread: "",
          valorPago: "",
          percentualComissao: "",
        },
      });



    const today = new Date()

    const selectDateHandler = (d: any) => {
        setDate(d)
    }


    const selectDateHandler2 = (d: any) => {
        setDate2(d)
    }

    const selectDateHandlerVencimento = (d: any) => {
        setDataVencimento(d)
    }

    useEffect(() => {

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
            
            carregaClientes()
            setUsuario_id_session(dados.usuario_id)

		    //setCliente_id(dados.cliente_id ? Number(dados.cliente_id) : undefined)
	

		}

	}, [dadosUsuarios])

    const carregaEmissao = () => {


        api.get(`emissaoListaUm/${props.emissao_id}`).then((result) => {

            //console.log(result.data[0], 'aqui')

            var data = result.data[0]
            
            setCliente_id(data.cliente_id)
            setDate(data.dataEmissao ? new Date(moment(data.dataEmissao, 'DD/MM/YYYY').format('YYYY-MM-DD')) : new Date())
            setDate2(data.dataInicio? new Date(moment(data.dataInicio, 'DD/MM/YYYY').format('YYYY-MM-DD')) : new Date())
            setDataVencimento(data.dataVencimento? new Date(moment(data.dataVencimento, 'DD/MM/YYYY').format('YYYY-MM-DD')) : new Date())
            setMoeda_id(data.moeda_id)
            setObjeto(data.objeto)
            setModalidade_id(data.modalidade_id)
            setModalidadeTexto(data.modalidadeTexto)
            setMulta(data.multa != undefined ? data.multa == true ? '1' : '0' : '')
            setTextoMulta(data.textoMulta)
            setTrabalhista(data.trabalhista != undefined ? data.trabalhista == true? '1' : '0' : '')
            setTextoTrabalhista(data.textoTrabalhista)
            setFiscal(data.fiscal != undefined? data.fiscal == true? '1' : '0' : '')
            setTextoFiscal(data.textoFiscal)

            setValor(data.valor? data.valor : '')	
            setDias(data.dias? data.dias : '')
            setDataVencimentoIndeterminado(data.dataVencimentoIndeterminado != undefined ? data.dataVencimentoIndeterminado == true ? '1' : '0' : '')

            setTomadores(data.tomadores)
            setFavorecidos(data.favorecidos)
            setValorComissao(data.valorComissao)
            setValorSpread(data.valorSpread)
            setPago(data.pago != undefined? data.pago == true? '1' : '0' : '')
            setPremio(data.premio)
            setTaxa(data.taxa)
            setValorPago(data.valorPago)
            setPercentualComissao(data.percentualComissao)
            setValorSpread(data.valorSpread)

            setObservacoesCorretor(data.observacoesCorretor)
            setObservacoesSubscritor(data.observacoesSubscritor)
            


        }).catch((err) => {
            console.log(err.response)
        })

    }

    useEffect(() => {

        if (props.emissao_id) {

            carregaEmissao()

        }

    }, [props.emissao_id])


    const carregaMoedas = () => {

        api.get('moeda').then((result) => {

            setMoedas(result.data)
        }).catch((err) => {
            console.log(err.response)
        })

    }
    
    useEffect(() => {

        carregaMoedas()

    }, [])


    useEffect(() => {

        if (tomador_id) {

            setColorTomador('orange')

        } else {

            setColorTomador('white')

        }
        

    }, [tomador_id])



    useEffect(() => {

        if (favorecido_id) {

            setColorFavorecido('orange')

        } else {

            setColorFavorecido('white')

        }
        

    }, [favorecido_id])


    const adicionaTomador = (obj: any) => {

        //console.log(obj, 'obj')

        if (tomadores.filter(item => item.tomador_id === obj.tomador_id).length == 0) {

            setTomadores([...tomadores, obj])
            setResultadoTomador('')
            setTomador('')
            
        } else {

            toast.error('Tomador já inserido na lista!')

        }

        

    }


    const adicionaFavorecido = (obj: any) => {

        //console.log(obj, 'obj')

        if (favorecidos.filter(item => item.favorecido_id === obj.favorecido_id).length == 0) {

            setFavorecidos([...favorecidos, obj])
            setResultadoFavorecido('')
            setFavorecido('')
            
        } else {

            toast.error('Tomador já inserido na lista!')

        }

        

    }

    const apagaTomador = (tomador_id: number) => {


        setTomadores(tomadores.filter(item => item.tomador_id !== tomador_id));

    }

    useEffect(() => {

        //console.log(tomadores)
        setTomadoresTabela(tomadores.map((rs) =>
        
            <tr>
                <td>
                    {rs.tomador}
                </td>
                <td style={{ cursor: 'pointer'}} onClick={() => apagaTomador(rs.tomador_id) }>
                    <span style={{ color: 'orange'}} >[Apagar]</span>
                </td>
            </tr>
        
        ))

        setTotalTomadores(tomadores.length)

    }, [tomadores])


    useEffect(() => {

        //console.log(tomadores)
        setFavorecidosTabela(favorecidos.map((rs) =>
        
            <tr>
                <td>
                    {rs.favorecido}
                </td>
                <td style={{ cursor: 'pointer'}} onClick={() => apagaFavorecido(rs.favorecido_id) }>
                    <span style={{ color: 'orange'}} >[Apagar]</span>
                </td>
            </tr>
        
        ))

        setTotalFavorecidos(favorecidos.length)

    }, [favorecidos])


    const apagaFavorecido = (favorecido_id: number) => {


        setFavorecidos(favorecidos.filter(item => item.favorecido_id !== favorecido_id));

    }

    useEffect(() => {

        //console.log(tomadores)
        setFavorecidosTabela(favorecidos.map((rs) =>
        
            <tr>
                <td>
                    {rs.favorecido}
                </td>
                <td style={{ cursor: 'pointer'}} onClick={() => apagaFavorecido(rs.favorecido_id) }>
                    <span style={{ color: 'orange'}} >[Apagar]</span>
                </td>
            </tr>
        
        ))

        setTotalTomadores(tomadores.length)

    }, [tomadores])


    useEffect(() => {

        if (tomador != '') {

            var dataPost = {

                tomador: tomador,
                cliente_id: cliente_id,

            }

            api.post('buscaTomador', dataPost).then((result) => {

                //console.log(result.data)
                setResultadoTomador(result.data.map((rs: iTomador) =>
                
                    <Link to='#' onClick={() => adicionaTomador({

                                                                tomador_id: rs.tomador_id,
                                                                tomador: `${rs.tipoJuridico == 'J' ? `${rs.cnpj} - ${rs.nomeFantasia}` : rs.tipoJuridico == 'F' ? `${rs.cpf} - ${rs.nome}` : `${rs.outroDocumento} - ${rs.nome}` }`,
                                                                cnpj: rs.cnpj,
                                                                tipoJuridico: rs.tipoJuridico,
                                                                cpf: rs.cpf,


                                    })}><span style={{ color: 'purple' }}>[{rs.tipoJuridico == 'J' ? rs.cnpj : rs.tipoJuridico == 'F' ? rs.cpf : rs.outroDocumento }]</span> - {rs.tipoJuridico == 'J' ? rs.nomeFantasia : rs.tipoJuridico == 'F' ? rs.nome : rs.outroDocumento}&nbsp;</Link>

                
                ))

            }).catch((err) => {

                console.log(err.response)

            })


        }


    }, [tomador])






    useEffect(() => {

        if (favorecido != '') {

            var dataPost = {

                descricao: favorecido,
                cliente_id: cliente_id,

            }

            api.post('favorecidoBusca', dataPost).then((result) => {

                //console.log(result.data)
                setResultadoFavorecido(result.data.map((rs: iFavorecido) =>
                
                    <Link to='#' onClick={() => adicionaFavorecido({

                                                                favorecido_id: rs.favorecido_id,
                                                                favorecido: `${rs.tipoJuridico == 'J' ? `${rs.cnpj} - ${rs.nomeFantasia}` : rs.tipoJuridico == 'F' ? `${rs.cpf} - ${rs.nome}` : `${rs.outroDocumento} - ${rs.nome}` }`,
                                                                cnpj: rs.cnpj,
                                                                tipoJuridico: rs.tipoJuridico,
                                                                cpf: rs.cpf,


                                    })}><span style={{ color: 'purple' }}>[{rs.tipoJuridico == 'J' ? rs.cnpj : rs.tipoJuridico == 'F' ? rs.cpf : rs.outroDocumento }]</span> - {rs.tipoJuridico == 'J' ? rs.nomeFantasia : rs.tipoJuridico == 'F' ? rs.nome : rs.outroDocumento}&nbsp;</Link>

                
                ))

            }).catch((err) => {

                console.log(err.response)

            })


        }


    }, [favorecido])


    const carregaClientes = () => {


        setClientes([])

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
            
            setClientes(dados.clientes)
            setCliente_id(dados.clientes.length == 1 ? dados.clientes[0].cliente_id : undefined)
		    //setCliente_id(dados.cliente_id ? Number(dados.cliente_id) : undefined)
	

		}

    }

    const carregaModalidades = () => {

        var dataPost = {

            cliente_id: cliente_id,

        }

        api.post('modalidadeListaTodos', dataPost).then((result) => {

            setModalidades(result.data.map((rs: iModalidades) =>
            
                <option value={rs.modalidade_id}>{rs.descricao}</option>
            
            ))

        }).catch((err) => {

            console.log(err.response)

        })

    }

    useEffect(() => {

        if (cliente_id) {

            carregaModalidades()

        }

    }, [cliente_id])

    const calculaDataVigencia = () => {
        if (startDate2 && dias) {
            const novaData = moment(startDate2).add(dias, 'days').toDate();
            setDataVencimento(novaData);
            return novaData;
          }
        
          return null;
      };

      const calculaDiasDeVigencia = () => {
        if (startDate2 && dataVencimento) {
          const inicio = moment(startDate2).startOf('day');
          const fim = moment(dataVencimento).startOf('day');
      
          const diferencaDias = fim.diff(inicio, 'days');
      
          setDias(diferencaDias);
          return diferencaDias;
        }
      
        return null;
      };


    const validaSalvar = () => {

        if (tomadores.length == 0) {
        	
            toast.error('Informe o tomador!')
            return false

        }

        if (favorecidos.length == 0) {

            toast.error('Informe o favorecido!')
            return false
        }


        setTitulo('Confirmação')
        setFrase('Confirma salvar?')
        setAcao('salvar')
        setOpen(true)


    }



    const salva = () => {
    		
        setOpen(false)

        
        if (props.emissao_id) {

            var dataPostPut = {

                cliente_id: cliente_id,
                dataEmissao: moment(startDate).format('YYYY-MM-DD'),
                dataInicio: moment(startDate2).format('YYYY-MM-DD'),
                dataVencimento: moment(dataVencimento).format('YYYY-MM-DD'),
                dias: dias,
                dataVencimentoIndeterminado: dataVencimentoIndeterminado == '1' ? true : dataVencimentoIndeterminado == '0' ? false : null,
                moeda_id: moeda_id,
                valor: valor ? Number(valor.toString().replaceAll('.', '').replaceAll(',', '.')) : null,
                objeto: objeto,
                modalidade_id: modalidade_id,
                modalidadeTexto: modalidadeTexto,
                taxa: taxa,
                premio: premio ? Number(premio.toString().replaceAll('.', '').replaceAll(',', '.')) : null,
                pago: pago == '1' ? true : pago == '0'? false : null,
                valorPago:  valorPago ? Number(valorPago.toString().replaceAll('.', '').replaceAll(',', '.')) : null,
                
                trabalhista: trabalhista == '1' ? true : trabalhista == '0' ? false : null,
                fiscal: fiscal == '1'? true : fiscal == '0' ? false : null,
                textoTrabalhista: textoTrabalhista,
                textoFiscal: textoFiscal,
                
                multa: multa == '1' ? true : multa == '0'? false : null,
                textoMulta: textoMulta,
                ad_usr: usuario_id_session,
                observacoesCorretor: observacoesCorretor,
                observacoesSubscritor: observacoesSubscritor,
                valorComissao: valorComissao ? Number(valorComissao.toString().replaceAll('.', '').replaceAll(',', '.')) : null,
                percentualComissao: percentualComissao,
                valorSpread: valorSpread ? Number(valorSpread.toString().replaceAll('.', '').replaceAll(',', '.')) : null,
                favorecidos: favorecidos.map((rs: iFavorecido) => rs.favorecido_id),
                tomadores: tomadores.map((rs: iTomador) => rs.tomador_id),
        
            }

            api.put(`emissao/${props.emissao_id}`, dataPostPut).then((result) => {

                if (result.data.status == 'ok') {

                    toast.success('Registro salvo com sucesso!')
                    
                    props.carregaEmissoes()
                    
                		
                }
            		
            }).catch((err) => {
                console.log(err.response)
            })

        		
        } else {

            var dataPost = {

                cliente_id: cliente_id,
                dataEmissao: moment(startDate).format('YYYY-MM-DD'),
                dataInicio: moment(startDate2).format('YYYY-MM-DD'),
                dataVencimento: moment(dataVencimento).format('YYYY-MM-DD'),
                dias: dias,
                dataVencimentoIndeterminado: dataVencimentoIndeterminado == '1' ? true : dataVencimentoIndeterminado == '0' ? false : null,
                moeda_id: moeda_id,
                valor: valor ? Number(valor.toString().replaceAll('.', '').replaceAll(',', '.')) : null,
                objeto: objeto,
                modalidade_id: modalidade_id,
                modalidadeTexto: modalidadeTexto,
                taxa: taxa,
                premio: premio ? Number(premio.toString().replaceAll('.', '').replaceAll(',', '.')) : null,
                pago: pago == '1' ? true : pago == '0'? false : null,
                valorPago:  valorPago ? Number(valorPago.toString().replaceAll('.', '').replaceAll(',', '.')) : null,
                
                trabalhista: trabalhista == '1' ? true : trabalhista == '0' ? false : null,
                fiscal: fiscal == '1'? true : fiscal == '0' ? false : null,
                textoTrabalhista: textoTrabalhista,
                textoFiscal: textoFiscal,
                
                multa: multa == '1' ? true : multa == '0'? false : null,
                textoMulta: textoMulta,
                ad_usr: usuario_id_session,
                observacoesCorretor: observacoesCorretor,
                observacoesSubscritor: observacoesSubscritor,
                valorComissao: valorComissao ? Number(valorComissao.toString().replaceAll('.', '').replaceAll(',', '.')) : null,
                percentualComissao: percentualComissao,
                valorSpread: valorSpread ? Number(valorSpread.toString().replaceAll('.', '').replaceAll(',', '.')) : null,
                favorecidos: favorecidos.map((rs: iFavorecido) => rs.favorecido_id),
                tomadores: tomadores.map((rs: iTomador) => rs.tomador_id),
    
    
            }

            api.post('emissao', dataPost).then((result) => {


                //console.log(result.data)
                toast.success('Salvo com sucesso!')
                setOpen(false)
                props.setShow(false)
                props.carregaEmissoes()
            
            }).catch((err) => {
                console.log(err.response)
                toast.error('Erro ao salvar!')
            })


        }

    }

    const carregaTextoModalidade = () => {

        var dataPost = {
        	cliente_id: cliente_id,
        }
    		
        api.post(`modalidadeListaUm/${modalidade_id}`, dataPost).then((result) => {
        	
            setModalidadeTexto(result.data[0].texto)

        }).catch((err) => {

            console.log(err.response)

        })

    }

    useEffect(() => {

        if (modalidade_id && cliente_id) {

            carregaTextoModalidade()
            
        }

    }, [modalidade_id, cliente_id])

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
                                                Tomador 
                                                <Badge style={{ fontSize: '0.7rem' }} bg='info'>{totalTomadores}</Badge>
                                        
                                        </div>
                                        </>
                                    }>
                                        


                                        <form className="row g-3">
                                           
                                            <div className="col-md-12">
                                                
                                                <input type="text" 
                                                className="form-control" 
                                                style={{ backgroundColor: colorTomador }} 
                                                value={tomador} 
                                                onChange={event => setTomador(event.target.value)} onFocus={() => {setTomador('');setResultadoTomador('');setTomador_id(undefined)}}
                                                placeholder="Busque o tomador para vinculação"
                                                />
                                                {resultadoTomador}
                                            </div>
                                            <div className="col-md-12">
                                                <fieldset className="form-group">
                                                    

                                                    <table className="table table-hover">
                                                        <thead>
                                                            <tr>
                                                            <th style={{ textAlign: 'left', backgroundColor: '#EFEFEF'}}>
                                                                
                                                                

                                                            </th>
                                                            
                                                            <th style={{ fontSize: '11px', backgroundColor: '#EFEFEF', textAlign: 'right'}}>
                                                                
                                                                &nbsp;

                                                            </th>
                                                            
                                                        </tr>
                                                                
                                                        </thead>
                                                        <tbody>

                                                            {tomadoresTabela}
                                                            
                                                        </tbody>
                                                    
                                                    </table>
                                            
                                                        
                                                    
                                                </fieldset>
                                            </div>
                                        

                                            
                                        </form>



                                    </Tab>
                                    <Tab eventKey="dadosFavorecido" title={
                                        <>
                                        <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                            <i
                                                className="material-icons-outlined">group</i>
                                                Favorecido 
                                                <Badge style={{ fontSize: '0.7rem' }} bg='primary'>{totalFavorecidos}</Badge>
                                        
                                        </div>
                                        </>
                                    }>
                                        


                                        <form className="row g-3">
                                           
                                            <div className="col-md-12">
                                                <label className="form-label">Favorecido</label>
                                                <input type="text" className="form-control" style={{ backgroundColor: colorFavorecido }} value={favorecido} onChange={event => setFavorecido(event.target.value)} onFocus={() => {setFavorecido('');setFavorecido_id(undefined)}} />
                                                {resultadoFavorecido}
                                            </div>
                                            
                                            <div className="col-md-12">
                                                <fieldset className="form-group">
                                                    

                                                    <table className="table table-hover">
                                                        <thead>
                                                            <tr>
                                                            <th style={{ textAlign: 'left', backgroundColor: '#EFEFEF'}}>
                                                                
                                                                

                                                            </th>
                                                            
                                                            <th style={{ fontSize: '11px', backgroundColor: '#EFEFEF', textAlign: 'right'}}>
                                                                
                                                                &nbsp;

                                                            </th>
                                                            
                                                        </tr>
                                                                
                                                        </thead>
                                                        <tbody>

                                                            {favorecidosTabela}
                                                            
                                                        </tbody>
                                                    
                                                    </table>
                                            
                                                        
                                                    
                                                </fieldset>
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
                                                <DatePicker
                                                    className="form-control" 
                                                    locale={ptBR} 
                                                    
                                                    wrapperClassName="w-100"
                                                    dateFormat="dd/MM/yyyy"                                                     
                                                    selected={startDate}
                                                    onChange={selectDateHandler} 
                                                    minDate={today}
                                                    customInput={

                                                        <TextInput placeholder="DD/MM/AAAA" maskType="date" className="form-control"  />
									
                                                    }
                                                    />
                                            </div>
                                            <div className="col-md-2">
                                                <label  className="form-label">Início da vigência</label>
                                                <DatePicker
                                                    className="form-control" 
                                                    locale={ptBR} 
                                                    
                                                    wrapperClassName="w-100"
                                                    dateFormat="dd/MM/yyyy"                                                     
                                                    selected={startDate2}
                                                    onChange={selectDateHandler2} 
                                                    minDate={today}
                                                    onBlur={calculaDataVigencia}
                                                    customInput={

                                                        <TextInput placeholder="DD/MM/AAAA" maskType="date" className="form-control"  />
									
                                                    }
                                                    />
                                            </div>

                                            <div className="col-md-4">
                                                <label  className="form-label">Vencimento indeterminado?</label>
                                                <select className="form-control"

                                                    value={dataVencimentoIndeterminado}
                                                    onChange={event => setDataVencimentoIndeterminado(event.target.value)}
                                                
                                                    >

                                                    <option value="">[Selecione]</option>
                                                    <option value="1">Sim</option>
                                                    <option value="0">Não</option>

                                                </select>
                                            </div>
                                            
                                            <div className="col-md-2" style={{ display: dataVencimentoIndeterminado == '1' ? 'none' : 'table-row' }}>
                                                <label  className="form-label">Dias</label>
                                                <input type="text" className="form-control"
                                                value={dias}
                                                onChange={event => setDias(event.target.value ? Number(event.target.value) : undefined)}
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                    }
                                                }} 
                                                 maxLength={4}
                                                 onBlur={calculaDataVigencia}
                                                 />
                                            </div>

                                            <div className="col-md-2"  style={{ display: dataVencimentoIndeterminado == '1' ? 'none' : 'table-row' }}>
                                                <label  className="form-label">Final da vigência</label>
                                                <DatePicker
                                                    className="form-control" 
                                                    locale={ptBR} 
                                                    
                                                    wrapperClassName="w-100"
                                                    dateFormat="dd/MM/yyyy"                                                     
                                                    selected={dataVencimento}
                                                    onChange={selectDateHandlerVencimento} 
                                                    minDate={today}
                                                    onBlur={calculaDiasDeVigencia}
                                                    customInput={

                                                        <TextInput placeholder="DD/MM/AAAA" maskType="date" className="form-control"  />
									
                                                    }
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <label  className="form-label">Moeda</label>
                                                <select className="form-control"
                                                    value={moeda_id}
                                                    onChange={event => setMoeda_id(event.target.value? Number(event.target.value) : undefined)}

                                                    >
                                                    <option value="">[Selecione]</option>
                                                    {moedas.map((rs: iMoedas) => <option value={rs.moeda_id}>{rs.descricao}</option>)}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label  className="form-label">Valor segurado</label>
                                                <Controller
                                                    name="valor"
                                                    control={control}
                                                    render={({ field }) => (
                                                    <CurrencyInput
                                                        value={valor}
                                                        onValueChange={(value) => field.onChange(value)} // Atualiza corretamente no RHF
                                                        onChange={event => setValor(event.target.value)}
                                                        placeholder="Digite um valor"
                                                        className="form-control"
                                                        
                                                    />
                                                    )}
                                                />
                                            </div>


                                            <div className="col-md-12" >
                                                <label  className="form-label">Objeto</label>
                                                <JoditEditorComponent
                                                key="editor-corretor"
                                                    initialValue={objeto}
                                                    onChange={(value) => setObjeto(value)}
                                                />
                                            </div>



                                            <div className="col-md-12">
                                                <label  className="form-label">Modalidade</label>
                                                <select className="form-control" value={modalidade_id} onChange={event => setModalidade_id(event.target.value ? Number(event.target.value) : undefined)}>
                                                    <option value="">[Selecione]</option>
                                                    {modalidades}
                                                </select>
                                            </div>

                                            <div className="col-md-12">
                                                <label  className="form-label">Texto modalidade</label>
                                                <JoditEditorComponent
                                                key="editor-corretor"
                                                    initialValue={modalidadeTexto}
                                                    onChange={(value) => setModalidadeTexto(value)}
                                                />
                                            </div>


                                            <div className="col-md-12">
                                                <label  className="form-label">Multas</label>
                                                <select className="form-control" value={multa} onChange={event => setMulta(event.target.value)}>
                                                    <option value="">[Selecione]</option>
                                                    <option value="1">Sim</option>
                                                    <option value="0">Não</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12" style={{ display: multa == '1' ? 'table-row' : 'none'}}>
                                                <label  className="form-label">Texto multa</label>
                                                <JoditEditorComponent
                                                key="editor-corretor"
                                                    initialValue={textoMulta}
                                                    onChange={(value) => setTextoMulta(value)}
                                                />
                                            </div>

                                            <div className="col-md-12">
                                                <label  className="form-label">Trabalhista e previdenciário</label>
                                                <select className="form-control" value={trabalhista} onChange={event => setTrabalhista(event?.target.value)}>
                                                    <option value="">[Selecione]</option>
                                                    <option value="1">Sim</option>
                                                    <option value="0">Não</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12" style={{ display: trabalhista == '1' ? 'table-row' : 'none'}}>
                                                <label  className="form-label">Texto trabalhista</label>
                                                <JoditEditorComponent
                                                key="editor-corretor"
                                                    initialValue={textoTrabalhista}
                                                    onChange={(value) => setTextoTrabalhista(value)}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label  className="form-label">Fiscal e tributário</label>
                                                <select className="form-control" value={fiscal} onChange={event => setFiscal(event.target.value)}>
                                                    <option value="">[Selecione]</option>
                                                    <option value="1">Sim</option>
                                                    <option value="0">Não</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12" style={{ display: fiscal == '1' ? 'table-row' : 'none'}}>
                                                <label  className="form-label">Texto fiscal e tributário</label>
                                                <JoditEditorComponent
                                                key="editor-corretor"
                                                    initialValue={textoFiscal}
                                                    onChange={(value) => setTextoFiscal(value)}
                                                />
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
                                                <Controller
                                                    name="premio"
                                                    control={control}
                                                    render={({ field }) => (
                                                    <CurrencyInput
                                                        value={premio}
                                                        onValueChange={(value) => field.onChange(value)} // Atualiza corretamente no RHF
                                                        onChange={event => setPremio(event.target.value)}
                                                        placeholder="Digite um valor"
                                                        className="form-control"
                                                        
                                                    />
                                                    )}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Taxa aplicada (%)</label>
                                                <input type="number" className="form-control" value={taxa} onChange={event => setTaxa(event.target.value ? Number(event.target.value) : undefined)} />
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <label  className="form-label">Valor da comissão</label>
                                                <Controller
                                                    name="valorComissao"
                                                    control={control}
                                                    render={({ field }) => (
                                                    <CurrencyInput
                                                        value={valorComissao}
                                                        onValueChange={(value) => field.onChange(value)} // Atualiza corretamente no RHF
                                                        onChange={event => setValorComissao(event.target.value)}
                                                        placeholder="Digite um valor"
                                                        className="form-control"
                                                        
                                                    />
                                                    )}
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <label  className="form-label">% de comissão</label>
                                                <input type="number" className="form-control" value={percentualComissao} onChange={event => setPercentualComissao(event.target.value ? Number(event.target.value) : undefined)} />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Valor do spread</label>
                                                <Controller
                                                    name="valorSpread"
                                                    control={control}
                                                    render={({ field }) => (
                                                    <CurrencyInput
                                                        value={valorSpread}
                                                        onValueChange={(value) => field.onChange(value)} // Atualiza corretamente no RHF
                                                        onChange={event => setValorSpread(event.target.value)}
                                                        placeholder="Digite um valor"
                                                        className="form-control"
                                                        
                                                    />
                                                    )}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label  className="form-label">Pago</label>
                                                <select className="form-control" value={pago} onChange={event => setPago(event.target.value)}>
                                                    <option value="">[Selecione]</option>
                                                    <option value="1">Sim</option>
                                                    <option value="0">Não</option>
                                                </select>
                                            </div>
                                            <div className="col-md-3" style={{ display: pago == '1' ? 'table-row' : 'none'}}>
                                                <label  className="form-label">Valor pago</label>
                                                <Controller
                                                    name="valorPago"
                                                    control={control}
                                                    render={({ field }) => (
                                                    <CurrencyInput
                                                        value={valorPago}
                                                        onValueChange={(value) => field.onChange(value)} // Atualiza corretamente no RHF
                                                        onChange={event => setValorPago(event.target.value)}
                                                        placeholder="Digite um valor"
                                                        className="form-control"
                                                        
                                                    />
                                                    )}
                                                />
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
                                                <JoditEditorComponent
                                                key="editor-corretor"
                                                    initialValue={observacoesCorretor}
                                                    onChange={(value) => setObservacoesCorretor(value)}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label  className="form-label">Observações do subscritor</label>
                                                <JoditEditorComponent
                                                key="editor-subscritor"
                                                    initialValue={observacoesSubscritor}
                                                    onChange={(value) => setObservacoesSubscritor(value)}
                                                />
                                            </div>


                                        </form>

                                    </Tab>

                                {
                                    props.emissao_id && (

                                        <Tab eventKey="pdf" title={
                                            <>
                                            <div className="dropdown-item d-flex align-items-center gap-2 py-2">
                                                <i
                                                        className="material-icons-outlined">print</i>
                                                        PDF
                                            
                                            </div>
                                            </>
                                        }>
                                            
                                            <form className="row g-3">

                                                <div className="col-md-12">

                                                    <div className="btn-group">
                                                        <button type="button" className="btn btn-primary btn-sm" style={{ cursor: 'auto'}}>Fiança</button>
                                                        <button
                                                            type="button"

                                                            className="btn btn-primary btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split"
                                                            data-bs-toggle="dropdown"
                                                        >
                                                            <span className="visually-hidden">Toggle Dropdown</span>
                                                        </button>

                                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
                                                            <a className="dropdown-item" href="#">Download</a>
                                                            <a className="dropdown-item" href="#">Gerar</a>
                                                            <a className="dropdown-item" href="#">Apagar</a>
                                                        </div>
                                                    </div>

                                                    <div className="btn-group" style={{ marginLeft: 5}}>
                                                        <button type="button" className="btn btn-success btn-sm" style={{ cursor: 'auto'}}>Minuta</button>
                                                        <button
                                                            type="button"

                                                            className="btn btn-success btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split"
                                                            data-bs-toggle="dropdown"
                                                        >
                                                            <span className="visually-hidden">Toggle Dropdown</span>
                                                        </button>

                                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
                                                            <a className="dropdown-item" href="#">Download</a>
                                                            <a className="dropdown-item" href="#">Gerar</a>
                                                            <a className="dropdown-item" href="#">Apagar</a>
                                                        </div>
                                                    </div>

                                                    <div className="btn-group"  style={{ marginLeft: 5}}>
                                                        <button type="button" className="btn btn-secondary btn-sm" style={{ cursor: 'auto'}}>Proposta não disponível</button>
                                                        <button
                                                            type="button"

                                                            className="btn btn-secondary btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split"
                                                            data-bs-toggle="dropdown"
                                                        >
                                                            <span className="visually-hidden">Toggle Dropdown</span>
                                                        </button>

                                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
                                                            <a className="dropdown-item" href="#">Download</a>
                                                            <a className="dropdown-item" href="#">Gerar</a>
                                                            <a className="dropdown-item" href="#">Apagar</a>
                                                        </div>
                                                    </div>

                                                    <div className="btn-group" style={{ marginLeft: 5}}>
                                                        <button type="button" className="btn btn-info btn-sm" style={{ cursor: 'auto'}}>NP</button>
                                                        <button
                                                            type="button"

                                                            className="btn btn-info btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split"
                                                            data-bs-toggle="dropdown"
                                                        >
                                                            <span className="visually-hidden">Toggle Dropdown</span>
                                                        </button>

                                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
                                                            <a className="dropdown-item" href="#">Download</a>
                                                            <a className="dropdown-item" href="#">Gerar</a>
                                                            <a className="dropdown-item" href="#">Apagar</a>
                                                        </div>
                                                    </div>

                                                    <div className="btn-group" style={{ marginLeft: 5}}>
                                                        <button type="button" className="btn btn-warning btn-sm" style={{ cursor: 'auto'}}>CCG</button>
                                                        <button
                                                            type="button"

                                                            className="btn btn-warning btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split"
                                                            data-bs-toggle="dropdown"
                                                        >
                                                            <span className="visually-hidden">Toggle Dropdown</span>
                                                        </button>

                                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
                                                            <a className="dropdown-item" href="#">Download</a>
                                                            <a className="dropdown-item" href="#">Gerar</a>
                                                            <a className="dropdown-item" href="#">Apagar</a>
                                                        </div>
                                                    </div>

                                                </div>

                                                    

    
                                            </form>
    
                                        </Tab>

                                    )
                                }

                                    



                    </Tabs>

                </div>

                

                <div className="col-md-12" style={{ marginTop: 50, textAlign: 'right' }}>


                        <button type="button" className="btn btn-secondary" onClick={() => props.setShow(false)} style={{ marginLeft: 5 }}>Fechar</button>
                        <button type="button" className="btn btn-success" style={{ marginLeft: 5, }} onClick={validaSalvar}>Salvar</button>

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



                            <Button color="error" variant="contained" onClick={() => setOpen(false)} style={{ display: acao == 'salvar' ? 'table-row' : 'none' }}>
                                Cancelar
                            </Button>
                            <Button color="success" variant="contained" onClick={() => salva()} style={{ display: acao == 'salvar' ? 'table-row' : 'none' }}>
                                Ok
                            </Button>


                        </DialogActions>
                    </Dialog>




        </div>

    )
}

export default FormEmissao