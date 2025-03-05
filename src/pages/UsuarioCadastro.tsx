
const UsuarioCadastro = () => {

    return (

        <div>


            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
					<div className="breadcrumb-title pe-3">Usuário</div>
					<div className="ps-3">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb mb-0 p-0">
								
								<li className="breadcrumb-item active" aria-current="page">Cadastro</li>
							</ol>
						</nav>
					</div>
					
				</div>

            <div className="row" style={{ marginTop: 20 }}>
                <div className="col-12 col-xl-12">
                    <div className="card">
                        <div className="card-body p-4">



                            <div className="row g-3">
                                <div className="col-md-12">

                        

                                </div>
                                <div className="col-md-12">
                                    <label className="form-label">Nome</label>
                                    <input type="text" className="form-control" style={{ backgroundColor: '#e9f2f1'}} />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label">E-mail</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">Senha</label>
                                    <input type="password" className="form-control" />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">Confirma senha</label>
                                    <input type="password" className="form-control" />
                                </div>
                                

                                <div className="col-md-3">
                                    <label className="form-label">Perfil</label>
                                    <select className="form-control" >
                                        <option value="">[Selecione]</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Bloqueado</label>
                                    <select className="form-control" >
                                        <option value="">[Selecione]</option>
                                        <option value="">Sim</option>
                                        <option value="">Não</option>
                                    </select>
                                </div>
                                
                            
                                <div className="col-md-12">
                                    <div className="d-md-flex d-grid align-items-center gap-2">
                                        <button type="button" className="btn btn-success">Salvar</button>
                                        
                                    </div>
                                </div>

                                
                            </div>



                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}


export default UsuarioCadastro