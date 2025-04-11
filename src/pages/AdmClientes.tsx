import { useState, useEffect } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import LoaderIcon from 'react-loading-icons'
import ModalAdmCliente from '../modals/ModalAdmCliente';
import moment from 'moment'
import api from '../components/api';



interface iClientes {

    cliente_id: number,
    nomeFantasia: string,
    cnpj: string,
    totalUsuarios: number,
    status: string,


}


const AdmClientes = () => {

    const [cliente_id, setCliente_id] = useState<number | undefined>()

    const [resultado, setResultado] = useState<iClientes[]>([])
    const [carregando, setCarregando] = useState<string>('none')

    const [show, setShow] = useState<boolean>(false)
    const [now, setNow] = useState<string | undefined>('')


    const carregaClientes = () => {

        

        api.get('clienteListaTodos').then((result) => {

            //console.log(result.data)
            setResultado(result.data)

        }).catch((err) => {

            console.log(err.response)

        })


    }


    useEffect(() => {

        carregaClientes()

    }, [])



    const columns: MRT_ColumnDef<iClientes>[] = [

        {
            accessorKey: 'nomeFantasia',
            header: 'Nome',
            

        },


        {
            accessorKey: 'razaoSocial',
            header: 'Razão Social',
            

        },


        {
            accessorKey: 'cnpj',
            header: 'CNPJ',
            

        },


        {
            accessorKey: 'totalUsuarios',
            header: 'Usuários',
            

        },





        {
            accessorKey: 'status',
            header: 'Status',
            Cell: ({ renderedCellValue, row }) => (
            
                renderedCellValue
           
            ),

        },





    ]

    return (

        <div>
            

                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
					<div className="breadcrumb-title pe-3">Clientes</div>
					<div className="ps-3">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb mb-0 p-0">
								
								<li className="breadcrumb-item active" aria-current="page">Administração</li>
							</ol>
						</nav>
					</div>
					
				</div>






                <div className="row" >

                    <div className="row g-3">

                        <div className="col-md-12" style={{ marginBottom: 20}}>
                            <div className="d-md-flex d-grid align-items-center gap-2">
                                
                                <button type="button" className="btn btn-primary" onClick={() => {setShow(false);setCliente_id(undefined)}}>+ Novo Cliente</button>
                                <button type="button" className="btn btn-success">Exportar XLSX</button>
                            
                            </div>
                        </div>


                        <div className="col-12 col-xl-12">
                            


                                    <center>
                                    <LoaderIcon.Puff stroke="#000" style={{ display: carregando }} />
                                    </center>


                                    <div className="col-lg-12" style={{ display: resultado.length == 0 ? 'none' : 'block'}}>


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
                                                    setCliente_id(row.original.cliente_id); 
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


                <ModalAdmCliente show={show} setShow={setShow} now={now} setNow={setNow} cliente_id={cliente_id} />

        </div>

    )

}

export default AdmClientes