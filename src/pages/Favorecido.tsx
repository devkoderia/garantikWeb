import { useState, useEffect } from "react"
import Badge from 'react-bootstrap/Badge';

import ModalFavorecido from "../modals/ModalFavorecido"
import moment from 'moment'

import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import LoaderIcon from 'react-loading-icons'
import api from "../components/api";

const Favorecido = (props: any) => {

    const [show, setShow] = useState<boolean>(false)
    const [now, setNow] = useState<string | undefined>('')



    interface iDados {

        favorecido_id: number,
        produtor_id: number,
        cliente_id: number,
        nome: string,
        cpf: string,
        valortotal: string,
        situacao: string,        
        nomeFantasia: string,
        quantidade: string,
        tipoJuridico: string,
        cnpj: string,
        razaoSocial: string,
        bloqueado: boolean,
        outroDocumento: string,

    }

    interface iClientes {

        cliente_id: number,
        nomeFantasia: string,
        cnpj: string,


    }


    const [resultado, setResultado] = useState<iDados[]>([])
    const [carregando, setCarregando] = useState<string>('none')

    const [cliente_id, setCliente_id] = useState<number | undefined>()
    const [clientes, setClientes] = useState<[]>([])
    const [favorecido_id, setFavorecido_id] = useState<number | undefined>()

    const dadosUsuarios = sessionStorage.getItem('dadosUsuarios')

    useEffect(() => {

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
            
            setClientes(dados.clientes)
            setCliente_id(dados.clientes.length == 1 ? dados.clientes[0].cliente_id : undefined)
		    //setCliente_id(dados.cliente_id ? Number(dados.cliente_id) : undefined)
	

		}

	}, [dadosUsuarios])



    const carregaFavorecidos = () => {


        var dataPost = {

            cliente_id: cliente_id,

        }
        

        setCarregando('block')

        api.post('favorecidoListaTodos', dataPost).then((result) => {

            

            setResultado(result.data.map((rs: iDados) => {

                return {

                    favorecido_id: rs.favorecido_id,
                    nome: rs.tipoJuridico == 'F' ? rs.nome : rs.razaoSocial,
                    cpf: rs.tipoJuridico == 'F' ? rs.cpf : rs.tipoJuridico == 'O' ? rs.outroDocumento : rs.cnpj,
                    tipoJuridico: rs.tipoJuridico,
                    bloqueado: rs.bloqueado,

                }


            }))
            setCarregando('none')

        }).catch((err) => {

            console.log(err.response)
            setCarregando('none')

        })
        

    }



    useEffect(() => {

        if (cliente_id) {

            carregaFavorecidos()

        }

    }, [cliente_id])

    const columns: MRT_ColumnDef<iDados>[] = [

        {
            accessorKey: 'tipoJuridico',
            header: 'Tipo',
            Cell: ({ renderedCellValue, row }) => (
            
                <Badge style={{ fontSize: '0.7rem' }} bg={ renderedCellValue == 'J' ? 'info' : renderedCellValue == 'O' ? 'warning' : 'primary'}>{renderedCellValue == 'J' ? 'Pessoa Jurídica' : renderedCellValue == 'O' ? 'Outro' : 'Pessoa Física'}</Badge>
           
            ),

        },

        {
            accessorKey: 'nome',
            header: 'Nome/Razão Social',
            

        },


        {
            accessorKey: 'cpf',
            header: 'CPF/CNPJ',
            

        },



    ]

    return (

        <div>


            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
					<div className="breadcrumb-title pe-3">Garantia</div>
					<div className="ps-3">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb mb-0 p-0">
								
								<li className="breadcrumb-item active" aria-current="page">Favorecido</li>
							</ol>
						</nav>
					</div>
					
				</div>

            <div className="col-md-12" style={{ marginBottom: 20}}>
                <div className="d-md-flex d-grid align-items-center gap-2">
                    
                    <button type="button" className="btn btn-primary" onClick={() => {setNow(moment().format('YYYY-MM-DD HH:mm:ss'));setCliente_id(clientes.length > 1 ? undefined : cliente_id);setFavorecido_id(undefined);setShow(true)}}>+ Novo</button>
                    <button type="button" className="btn btn-success" disabled>Exportar XLSX</button>
                
                </div>
            </div>

            <div className="row" >
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
                    <div className="col-12 col-xl-12">
                        

                                <center>
                                <LoaderIcon.Puff stroke="#000" style={{ display: carregando }} />
                                </center>


                                <div className="col-lg-12" style={{ display: resultado.length > 0 ? 'block' : 'none'}}>


                                    <MaterialReactTable

                                        columns={columns}
                                        data={resultado}
                                        localization={MRT_Localization_PT_BR}
                                        //rowsPerPage={20}
                                        //options={options}
                                        initialState={{ density: 'compact' }}
                                        muiTableHeadCellProps={{
                                            //easier way to create media queries, no useMediaQuery hook needed.
                                            sx: {
                                                fontSize: {
                                                    xs: '8px',
                                                    sm: '9px',
                                                    md: '10px',
                                                    lg: '11px',
                                                    xl: '12px',
                                                },
                                            },
                                        }}
                                        muiTableBodyCellProps={{
                                            sx: {
                                                fontSize: {
                                                    xs: '8px',
                                                    sm: '9px',
                                                    md: '10px',
                                                    lg: '11px',
                                                    xl: '12px',
                                                },
                                            },
                                        }}
                                        muiTableBodyRowProps={({ row }) => ({
                                            onClick: () => {
                                                setShow(true);
                                                setFavorecido_id(row.original.favorecido_id)
                                                setNow(moment().format('YYYYMMDDHHmmss'))
                                            },
                                            sx: {
                                                cursor: 'pointer', 
                                            },
                                        })}
                                    />

                                </div>



                            </div>
                    </div>
            </div>
            
            <ModalFavorecido favorecido_id={favorecido_id} cliente_id={cliente_id} show={show} setShow={setShow} now={now} setNow={setNow} carregaFavorecidos={carregaFavorecidos}/>

        </div>

    )


}

export default Favorecido