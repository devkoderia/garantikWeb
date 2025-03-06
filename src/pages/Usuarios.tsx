import { useState, useEffect } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import LoaderIcon from 'react-loading-icons'
import ModalUsuario from '../modals/ModalUsuario';
import moment from 'moment'
import api from '../components/api';


const Usuarios = () => {




    interface iDados {

        
        nome: string,
        cpf: string,
        usuario_id: number,
        perfilDescricao: string,        
        
        

    }


    const [resultado, setResultado] = useState<iDados[]>([])
    const [carregando, setCarregando] = useState<string>('none')

    const [show, setShow] = useState<boolean>(false)
    const [now, setNow] = useState<string | undefined>('')
    const [cliente_id, setCliente_id] = useState<number | undefined>()




    const dadosUsuarios = sessionStorage.getItem('dadosUsuarios')

    useEffect(() => {

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
            

		    setCliente_id(dados.cliente_id ? Number(dados.cliente_id) : undefined)
	

		}

	}, [dadosUsuarios])



    const columns: MRT_ColumnDef<iDados>[] = [

        {
            accessorKey: 'nome',
            header: 'Nome',
            

        },


        {
            accessorKey: 'cpf',
            header: 'CPF',
            

        },



        {
            accessorKey: 'perfilDescricao',
            header: 'Perfil',
            Cell: ({ renderedCellValue, row }) => (
            
                renderedCellValue
           
            ),

        },





    ]


    const carregaUsuarios = () => {

        var dataPost = {

            cliente_id: cliente_id,

        }

        setCarregando('block')

        api.post('usuarioListaTabela', dataPost).then((result) => {

            //console.log(result.data)
            setResultado(result.data)

            setCarregando('none')

        }).catch((err) => {

            setCarregando('none')
            console.log(err.response)

        })

    }

    useEffect(() => {

        if (cliente_id) {

            carregaUsuarios()

        }
       

    }, [cliente_id])


    return (

        <div>


            

                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
					<div className="breadcrumb-title pe-3">Usuários</div>
					<div className="ps-3">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb mb-0 p-0">
								
								<li className="breadcrumb-item active" aria-current="page">Cadastro</li>
							</ol>
						</nav>
					</div>
					
				</div>


                    



                <div className="row" >

                    <div className="col-md-12" style={{ marginBottom: 20}}>
                        <div className="d-md-flex d-grid align-items-center gap-2">
                            
                            <button type="button" className="btn btn-primary" onClick={() => {setNow(moment().format('YYYYMMDDHHmmss'));setShow(true)}}>+ Novo</button>
                            <button type="button" className="btn btn-success">Exportar XLSX</button>
                        
                        </div>
                    </div>

					<div className="col-12 col-xl-12">
                        


                                <center>
                                <LoaderIcon.Puff stroke="#000" style={{ display: carregando }} />
                                </center>


                                <div className="col-lg-12" style={{ display: carregando == 'block' ? 'none' : 'block'}}>


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
                                                
                                            },
                                            sx: {
                                                cursor: 'pointer', 
                                            },
                                        })}
                                    />

                                </div>



                            
                    </div>
                </div>


            <ModalUsuario show={show} setShow={setShow} now={now} setNow={setNow} />


        </div>

    )

}

export default Usuarios