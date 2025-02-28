import { Outlet, Link } from "react-router-dom"

const Layout = () => {

    return (

        <div>

            
            <header className="top-header">
                <nav className="navbar navbar-expand align-items-center justify-content-between gap-4 border-bottom">

                    <div className="logo-header d-none d-xl-flex align-items-center gap-2">
                    <div className="logo-icon">
                        <img src="/assets/images/logo-icon.png" className="logo-img" width="45" alt="" />
                    </div>
                    <div className="logo-name">
                        <h5 className="mb-0">GarantiK</h5>
                    </div>
                    </div>
                    <div className="btn-toggle d-xl-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
                    <a href="#"><i className="material-icons-outlined">menu</i></a>
                    </div>


                    <ul className="navbar-nav gap-1 nav-right-links align-items-center">

                        <li className="nav-item dropdown">
                            <a href="javascrpt:;" className="dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
                            <img src="/assets/images/avatars/01.png" className="rounded-circle p-1 border" width="45" height="45" alt="" />
                            </a>
                            <div className="dropdown-menu dropdown-user dropdown-menu-end shadow">
                            <a className="dropdown-item  gap-2 py-2" href="javascript:;">
                                <div className="text-center">
                                <img src="/assets/images/avatars/01.png" className="rounded-circle p-1 shadow mb-3" width="90" height="90"
                                    alt="" />
                                <h5 className="user-name mb-0 fw-bold">Olá, John</h5>
                                </div>
                            </a>
                            <hr className="dropdown-divider" />
                            <a className="dropdown-item d-flex align-items-center gap-2 py-2" href="javascript:;"><i
                                className="material-icons-outlined">person_outline</i>Perfil</a>
                            <a className="dropdown-item d-flex align-items-center gap-2 py-2" href="javascript:;"><i
                                className="material-icons-outlined">key</i>Senha</a>
                            
                            <hr className="dropdown-divider" />
                            <Link className="dropdown-item d-flex align-items-center gap-2 py-2" to='/'><i
                            className="material-icons-outlined">power_settings_new</i>Sair</Link>
                            </div>
                        </li>


                    </ul>
                    
                    

                </nav>
            </header>


    <div className="primary-menu">
        <nav className="navbar navbar-expand-xl align-items-center">
        <div className="offcanvas offcanvas-start w-260" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header border-bottom h-70">
            <div className="d-flex align-items-center gap-2">
            <div className="">
                <img src="assets/images/logo-icon.png" className="logo-icon" width="45" alt="logo icon" />
            </div>
            <div className="">
                <h4 className="logo-text">GarantiK</h4>
            </div>
            </div>
            <a href="javascript:;" className="primaery-menu-close" data-bs-dismiss="offcanvas">
            <i className="material-icons-outlined">close</i>
            </a>
        </div>
        <div className="offcanvas-body p-0">
            <ul className="navbar-nav align-items-center flex-grow-1">
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-bs-toggle="dropdown">
                <div className="parent-icon"><i className="material-icons-outlined">home</i>
                </div>
                <div className="menu-title d-flex align-items-center">Dashboard</div>
                <div className="ms-auto dropy-icon"><i className='material-icons-outlined'>expand_more</i></div>
            </a>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/Dashboard"><i className='material-icons-outlined'>insights</i>Números gerais</a></li>
                <li><a className="dropdown-item" href="/Dashboard/Financeiro"><i className='material-icons-outlined'>shopping_cart</i>Financeiros</a></li>
            </ul>
            </li>
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-bs-toggle="dropdown">
                <div className="parent-icon"><i className='material-icons-outlined'>apps</i>
                </div>
                <div className="menu-title d-flex align-items-center">Garantia</div>
                <div className="ms-auto dropy-icon"><i className='material-icons-outlined'>expand_more</i></div>
            </a>
            <ul className="dropdown-menu">

                
                <li className="nav-item dropend">
                <a className="dropdown-item dropdown-toggle dropdown-toggle-nocaret" href="javascript:;"><i className='material-icons-outlined'>layers</i>Produtor</a>
                <ul className="dropdown-menu submenu">
                    
                    <li><a className="dropdown-item" href="/Produtor/Cadastro"><i className='material-icons-outlined'>dns</i>Cadastrar</a></li>
                    <li><a className="dropdown-item" href="/Produtor/Lista"><i className='material-icons-outlined'>folder</i>Listar</a></li>
                    
                </ul>
                </li>

                <li className="nav-item dropend">
                <a className="dropdown-item dropdown-toggle dropdown-toggle-nocaret" href="javascript:;"><i className='material-icons-outlined'>work_outline</i>Corretor</a>
                <ul className="dropdown-menu submenu">
                    
                    <li><a className="dropdown-item" href="/Corretor/Cadastro"><i className='material-icons-outlined'>dns</i>Cadastrar</a></li>
                    <li><a className="dropdown-item" href="/Corretor/Lista"><i className='material-icons-outlined'>folder</i>Listar</a></li>
                    <li><a className="dropdown-item" href="/Corretor/ListaAutoCadastro"><i className='material-icons-outlined'>tips_and_updates</i>Lista auto cadastro</a></li>
                    
                </ul>
                </li>

                <li className="nav-item dropend">
                <a className="dropdown-item dropdown-toggle dropdown-toggle-nocaret" href="javascript:;"><i className='material-icons-outlined'>source</i>Afiançado</a>
                <ul className="dropdown-menu submenu">
                    
                    <li><a className="dropdown-item" href="/Afiancado/Cadastrar"><i className='material-icons-outlined'>integration_instructions</i>Cadastrar</a></li>
                    <li><a className="dropdown-item" href="/Afiancado/Listar"><i className='material-icons-outlined'>hourglass_empty</i>Listar</a></li>                    
                    
                </ul>
                </li>

                <li className="nav-item dropend">
                <a className="dropdown-item dropdown-toggle dropdown-toggle-nocaret" href="javascript:;"><i className='material-icons-outlined'>backup</i>Beneficiário</a>
                <ul className="dropdown-menu submenu">
                    
                    <li><a className="dropdown-item" href="/Beneficiario/Cadastro"><i className='material-icons-outlined'>integration_instructions</i>Cadastrar</a></li>
                    <li><a className="dropdown-item" href="/Beneficiario/Lista"><i className='material-icons-outlined'>folder</i>Listar</a></li>                    
                    
                </ul>
                </li>

                <li className="nav-item dropend">
                <a className="dropdown-item dropdown-toggle dropdown-toggle-nocaret" href="javascript:;"><i className='material-icons-outlined'>account_circle</i>Proposta</a>
                <ul className="dropdown-menu submenu">
                    
                    <li><a className="dropdown-item" href="/Proposta/Cadastro"><i className='material-icons-outlined'>integration_instructions</i>Cadastrar</a></li>
                    <li><a className="dropdown-item" href="/Proposta/Lista"><i className='material-icons-outlined'>folder</i>Listar</a></li>                    
                    
                </ul>
                </li>


            </ul>
            </li>
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-bs-toggle="dropdown">
                <div className="parent-icon"><i className='material-icons-outlined'>note_alt</i>
                </div>
                <div className="menu-title d-flex align-items-center">Fiança</div>
                <div className="ms-auto dropy-icon"><i className='material-icons-outlined'>expand_more</i></div>
            </a>
            <ul className="dropdown-menu">
                <li> <a className="dropdown-item" href="/Fianca/Lista"><i className='material-icons-outlined'>source</i>Listar</a>
                </li>
                
            </ul>
            </li>
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-bs-toggle="dropdown">
                <div className="parent-icon"><i className='material-icons-outlined'>account_circle</i>
                </div>
                <div className="menu-title d-flex align-items-center">Relatórios</div>
                <div className="ms-auto dropy-icon"><i className='material-icons-outlined'>expand_more</i></div>
            </a>
            <ul className="dropdown-menu">
                
                <li className="nav-item dropend">
                <a className="dropdown-item dropdown-toggle dropdown-toggle-nocaret" href="javascript:;"><i className='material-icons-outlined'>event</i>Financeiro</a>
                <ul className="dropdown-menu submenu">
                <li><a className="dropdown-item" href="/Relatorio/Corretor"><i className='material-icons-outlined'>dns</i>Por corretor</a></li>
                
                </ul>
                </li>
                <li><a className="dropdown-item" href="/Relatorio/Garantias"><i className='material-icons-outlined'>email</i>Garantias</a></li>
                <li><a className="dropdown-item" href="/Relatorio/Propostas"><i className='material-icons-outlined'>chat</i>Propostas</a></li>
                
                
            </ul>
            </li>
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-bs-toggle="dropdown">
                <div className="parent-icon"><i className='material-icons-outlined'>medical_services</i>
                </div>
                <div className="menu-title d-flex align-items-center">Usuários</div>
                <div className="ms-auto dropy-icon"><i className='material-icons-outlined'>expand_more</i></div>
            </a>
            <ul className="dropdown-menu">
                
                <li><a className="dropdown-item" href="/Usuarios/Cadastro"><i className='material-icons-outlined'>dns</i>Cadastrar</a></li>
                <li><a className="dropdown-item" href="/Usuarios/Lista"><i className='material-icons-outlined'>folder</i>Listar</a></li>
            </ul>
            </li>
            


            </ul>
        </div>
        </div>
        </nav>
    </div>


    <main className="main-wrapper">
        <div className="main-content">

            <Outlet />

        </div>
    </main>



    </div>

    )

}

export default Layout