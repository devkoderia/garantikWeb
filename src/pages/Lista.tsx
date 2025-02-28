import FormLista from "../componentsPage/FormLista"

const ProdutorLista = (props: any) => {




    return (

        <div>


            

                <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
					<div className="breadcrumb-title pe-3">Garantia</div>
					<div className="ps-3">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb mb-0 p-0">
								
								<li className="breadcrumb-item active" aria-current="page">{props.tipo}</li>
							</ol>
						</nav>
					</div>
					
				</div>


                    
                <FormLista />



        </div>

    )

}

export default ProdutorLista