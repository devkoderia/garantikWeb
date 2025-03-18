import { useState, useEffect } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import LoaderIcon from 'react-loading-icons'


const FormLista = (props: any) => {



    interface iDados {

        
        nome: string,
        cpf: string,
        valortotal: string,
        situacao: string,        
        nomeFantasia: string,
        quantidade: string,
        

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


    const dadosUsuarios = sessionStorage.getItem('dadosUsuarios')

    useEffect(() => {

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)
            
            setClientes(dados.clientes)

		    //setCliente_id(dados.cliente_id ? Number(dados.cliente_id) : undefined)
	

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
                    <div className="row g-3">
                        <div className="col-md-12">
                            
                            <select className="form-control" value={cliente_id} onChange={event => setCliente_id(event.target.value ? Number(event.target.value) : undefined)} >
                                <option value="">[Selecione]</option>
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


    )

}

export default FormLista