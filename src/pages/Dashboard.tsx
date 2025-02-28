


const Home = () => {

    return (

        <div>

                    <form className="row g-3">
                        <div className="col-md-4">
                            
                            <select  className="form-control" style={{ backgroundColor: '#f4f2ff'}}>
                                <option value="">[Ano]</option>

                            </select>
                        </div>
                        <div className="col-md-4">
                            
                            <select  className="form-control"  style={{ backgroundColor: '#f4f2ff'}}>
                                <option value="">[Mês]</option>

                            </select>
                        </div>
                        <div className="col-md-4">
                            
                            <select className="form-control"  style={{ backgroundColor: '#f4f2ff'}}>
                                <option value="">[Corretor]</option>

                            </select>
                        </div>
                    </form>

                    <div className="row" style={{ marginTop: 15}}>



                        <div className="col-12 col-lg-4 col-xxl-3 d-flex">
                            <div className="card rounded-4 w-100">
                                <div className="card-body">
                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                    <div
                                    className="wh-42 d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary">
                                    <span className="material-icons-outlined fs-5">shopping_cart</span>
                                    </div>
                                    <div>
                                    <span className="text-success d-flex align-items-center">+24%<i
                                        className="material-icons-outlined">expand_less</i></span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="mb-0">145</h4>
                                    <p className="mb-3">Fianças emitidas</p>
                                    
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-12 col-lg-4 col-xxl-3 d-flex">
                            <div className="card rounded-4 w-100">
                                <div className="card-body">
                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                    <div
                                    className="wh-42 d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 text-success">
                                    <span className="material-icons-outlined fs-5">attach_money</span>
                                    </div>
                                    <div>
                                    <span className="text-success d-flex align-items-center">+14%<i
                                        className="material-icons-outlined">expand_less</i></span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="mb-0">R$ 35 mil</h4>
                                    <p className="mb-3">Montante</p>
                                    
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-12 col-lg-6 col-xxl-3 d-flex">
                            <div className="card rounded-4 w-100">
                                <div className="card-body">
                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                    <div
                                    className="wh-42 d-flex align-items-center justify-content-center rounded-circle bg-info bg-opacity-10 text-info">
                                    <span className="material-icons-outlined fs-5">visibility</span>
                                    </div>
                                    <div>
                                    <span className="text-danger d-flex align-items-center">-35%<i
                                        className="material-icons-outlined">expand_less</i></span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="mb-0">42</h4>
                                    <p className="mb-3">Clientes</p>
                                    
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-12 col-lg-6 col-xxl-3 d-flex">
                            <div className="card rounded-4 w-100">
                                <div className="card-body">
                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                    <div
                                    className="wh-42 d-flex align-items-center justify-content-center rounded-circle bg-warning bg-opacity-10 text-warning">
                                    <span className="material-icons-outlined fs-5">leaderboard</span>
                                    </div>
                                    <div>
                                    <span className="text-success d-flex align-items-center">+18%<i
                                        className="material-icons-outlined">expand_less</i></span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="mb-0">24.6%</h4>
                                    <p className="mb-3">Balanço</p>
                                    
                                </div>
                                </div>
                            </div>
                            </div>

                        

                        
                    </div>



        </div>

    )

}


export default Home