import React, { useState, useEffect } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import api from "../components/api";
import { Link } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form";
import moment from 'moment'
import CurrencyInput from '../components/CurrencyInput';
import TextInput from '../components/TextInput';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import { ptBR } from "date-fns/locale";


interface iClientes {

    cliente_id: number,
    nomeFantasia: string,
    cnpj: string,


}

interface iTomador {

    tomador_id: number,
    cnpj: string,
    cpf: string,
    nome: string,
    nomeFantasia: string,
    tipoJuridico: string,
    outroDocumento: string,

}


interface iFavorecido {

    favorecido_id: number,
    cnpj: string,
    cpf: string,
    nome: string,
    nomeFantasia: string,
    tipoJuridico: string,
    outroDocumento: string,

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
    const [dataVencimento, setDataVencimento] = useState<string | undefined>('')

    
    
    const [dataEmissao, setDataEmissao] = useState<string>('')
    const [dataInicio, setDataInicio] = useState<string>('')    
    
    const [dataVencimentoIndeterminado, setDataVencimentoIndeterminado] = useState<string>('')
    const [moeda_id, setMoeda_id] = useState<number | undefined>()
    const [valor, setValor] = useState<string | undefined>('')
    const [objeto, setObjeto] = useState<string>('')
    
    const [modalidadeTexto, setModalidadeTexto] = useState<string>('')
    const [taxa, setTaxa] = useState<number | undefined>()
    const [premio, setPremio] = useState<string>('')
    const [pago, setPago] = useState<string>('')
    const [valorPago, setValorPago] = useState<string>('')
    const [minuta, setMinuta] = useState<string>('')
    const [garantia, setGarantia] = useState<string>('')
    const [trabalhista, setTrabalhista] = useState<string>('')
    const [fiscal, setFiscal] = useState<string>('')
    const [textoTrabalhista, setTextoTrabalhista] = useState<string>('')
    const [textoFiscal, setTextoFiscal] = useState<string>('')
    const [sinistro, setSinistro] = useState<string>('')
    const [bloqueada, setBloqueada] = useState<string>('')
    //const [ad_usr, setAd_usr] = useState<string>('')


    const [modalidade_id, setModalidade_id] = useState<number | undefined>()
    const [modalidades, setModalidades] = useState<React.ReactNode>()
                
    
    const { control, handleSubmit } = useForm({
        defaultValues: {
          valor: "",
        },
      });



    const today = new Date()

    const selectDateHandler = (d: any) => {
        setDate(d)
    }


    const selectDateHandler2 = (d: any) => {
        setDate2(d)
    }

    useEffect(() => {

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
            
            carregaClientes()
            setUsuario_id_session(dados.usuario_id)

		    //setCliente_id(dados.cliente_id ? Number(dados.cliente_id) : undefined)
	

		}

	}, [dadosUsuarios])

    


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




    useEffect(() => {

        if (tomador != '') {

            var dataPost = {

                tomador: tomador,
                cliente_id: cliente_id,

            }

            api.post('buscaTomador', dataPost).then((result) => {

                //console.log(result.data)
                setResultadoTomador(result.data.map((rs: iTomador) =>
                
                    <Link to='#' onClick={() => {setTomador_id(rs.tomador_id);setTomador(`${rs.tipoJuridico == 'J' ? `${rs.cnpj} - ${rs.nomeFantasia}` : rs.tipoJuridico == 'F' ? `${rs.cpf} - ${rs.nome}` : `${rs.outroDocumento} - ${rs.nome}` }`)}}><span style={{ color: 'purple' }}>[{rs.tipoJuridico == 'J' ? rs.cnpj : rs.tipoJuridico == 'F' ? rs.cpf : rs.outroDocumento }]</span> - {rs.tipoJuridico == 'J' ? rs.nomeFantasia : rs.tipoJuridico == 'F' ? rs.nome : rs.outroDocumento}&nbsp;</Link>
                
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
                
                    <Link to='#' onClick={() => {setFavorecido_id(rs.favorecido_id);setFavorecido(`${rs.tipoJuridico == 'J' ? `${rs.cnpj} - ${rs.nomeFantasia}` : rs.tipoJuridico == 'F' ? `${rs.cpf} - ${rs.nome}` : `${rs.outroDocumento} - ${rs.nome}` }`)}}><span style={{ color: 'purple' }}>[{rs.tipoJuridico == 'J' ? rs.cnpj : rs.tipoJuridico == 'F' ? rs.cpf : rs.outroDocumento }]</span> - {rs.tipoJuridico == 'J' ? rs.nomeFantasia : rs.tipoJuridico == 'F' ? rs.nome : rs.outroDocumento}&nbsp;</Link>
                
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
          const dataFormatada = moment(startDate2)
            .add(dias, 'days')
            .format('DD/MM/YYYY');
      
          setDataVencimento(dataFormatada);
          return dataFormatada;
        }
      
        return null;
      };


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
                                                <input type="text" className="form-control" style={{ backgroundColor: colorTomador }} value={tomador} onChange={event => setTomador(event.target.value)} onFocus={() => {setTomador('');setTomador_id(undefined)}}/>
                                                {resultadoTomador}
                                            </div>
                                            <div className="col-md-12">
                                                <label className="form-label">Favorecido</label>
                                                <input type="text" className="form-control" style={{ backgroundColor: colorFavorecido }} value={favorecido} onChange={event => setFavorecido(event.target.value)} onFocus={() => {setFavorecido('');setFavorecido_id(undefined)}} />
                                                {resultadoFavorecido}
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
                                            
                                            <div className="col-md-2">
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

                                            <div className="col-md-2">
                                                <label  className="form-label">Final da vigência</label>
                                                <input type="text" className="form-control" disabled value={dataVencimento} />
                                            </div>
                                            <div className="col-md-4">
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

                                            <div className="col-md-12">
                                                <label  className="form-label">Modalidade</label>
                                                <select className="form-control" value={modalidade_id} onChange={event => setModalidade_id(event.target.value ? Number(event.target.value) : undefined)}>
                                                    <option value="">[Selecione]</option>
                                                    {modalidades}
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label  className="form-label">Multas</label>
                                                <select className="form-control" >
                                                    <option value="">[Selecione]</option>
                                                    <option value="">Sim</option>
                                                    <option value="">Não</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label  className="form-label">Trabalhista e previdenciário</label>
                                                <select className="form-control" >
                                                    <option value="">[Selecione]</option>
                                                    <option value="">Sim</option>
                                                    <option value="">Não</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
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
                                                <input type="number" className="form-control" value={taxa} onChange={event => setTaxa(event.target.value ? Number(event.target.value) : undefined)} />
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