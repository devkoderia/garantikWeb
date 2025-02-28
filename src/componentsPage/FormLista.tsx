import { useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import LoaderIcon from 'react-loading-icons'


const FormLista = () => {



    interface iDados {

        
        nome: string,
        cpf: string,
        valortotal: string,
        situacao: string,        
        nomeFantasia: string,
        quantidade: string,
        

    }


    const [resultado, setResultado] = useState<iDados[]>([])
    const [carregando, setCarregando] = useState<string>('none')


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
            accessorKey: 'quantidade',
            header: 'Qtde',
            muiTableHeadCellProps: {
                align: 'right',
              },
            muiTableBodyCellProps: {
                align: 'right',
              },

        },


        {
            accessorKey: 'valorTotal',
            header: 'Valor R$',
            muiTableHeadCellProps: {
                align: 'right',
              },
            muiTableBodyCellProps: {
                align: 'right',
              },

        },



    ]

    return (

        <div>



                <div className="row" >
					<div className="col-12 col-xl-12">
                        <div className="card">
							<div className="card-body p-4">

                                <div className="col-md-12" style={{ marginBottom: 20}}>
                                    <div className="d-md-flex d-grid align-items-center gap-2">
                                        <button type="button" className="btn btn-success">Exportar XLSX</button>
                                    
                                    </div>
                                </div>

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
                    </div>
                </div>



        </div>


    )

}

export default FormLista