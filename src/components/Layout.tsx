import { useState, useEffect } from "react"
import { Outlet, Link, useNavigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import ModalSenha from "../modals/ModalSenha"
import moment from 'moment'

const Layout = () => {

    const navigate = useNavigate()

    const [show, setShow] = useState(false)
	const [now, setNow] = useState<string>('')

    const dadosUsuarios = sessionStorage.getItem('dadosUsuarios')

	const [nome, setNome] = useState<string | null>()
	const [usuario_id, setUsuario_id] = useState<number | null>()	
	const [email, setEmail] = useState<string | null>()
	const [perfil, setPerfil] = useState<string | null>()

	useEffect(() => {

		if (dadosUsuarios) {

			var dados = JSON.parse(dadosUsuarios)

			setNome(dados.nome)
			setUsuario_id(dados.usuario_id)
			setEmail(dados.email)
			setPerfil(dados.perfil)

		}

	}, [dadosUsuarios])


	const logoff = () => {

		sessionStorage.clear()
        window.location.href = '/'
        //navigate('/')
		
        /*
		setUsuario_id(null)
		setNome(null)
		setEmail(null)
		setPerfil(null)
        */
				
        //

	}

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
                            <img src="/assets/images/avatars/avatarDefault.png" className="rounded-circle p-1 border" width="45" height="45" alt="" />
                            </a>
                            <div className="dropdown-menu dropdown-user dropdown-menu-end shadow">
                            <div className="dropdown-item  gap-2 py-2">
                                <div className="text-center">
                                <img src="/assets/images/avatars/avatarDefault.png" className="rounded-circle p-1 shadow mb-3" width="90" height="90"
                                    alt="" />
                                <h5 className="user-name mb-0 fw-bold">Olá, {nome}</h5>
                                </div>
                            </div>
                            <hr className="dropdown-divider" />
                            <a className="dropdown-item d-flex align-items-center gap-2 py-2" href="javascript:;"><i
                                className="material-icons-outlined">person_outline</i>Perfil</a>
                            <Link to='#' className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => {setNow(moment().format('YYYY-MM-DD HH:mm:ss'));setShow(true)}}><i
                                className="material-icons-outlined">key</i>Senha</Link>
                            
                            <hr className="dropdown-divider" />
                            <Link className="dropdown-item d-flex align-items-center gap-2 py-2" to='#' onClick={logoff}><i
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

                <li><a className="dropdown-item" href="/Produtor"><i className='material-icons-outlined'>layers</i>Produtor</a></li>
                <li><a className="dropdown-item" href="/Corretor"><i className='material-icons-outlined'>folder</i>Corretor</a></li>
                <li><a className="dropdown-item" href="/Tomador"><i className='material-icons-outlined'>source</i>Tomador</a></li>
                <li><a className="dropdown-item" href="/Favorecido"><i className='material-icons-outlined'>backup</i>Favorecido</a></li>
                <li><a className="dropdown-item" href="/Proposta"><i className='material-icons-outlined'>account_circle</i>Proposta</a></li>
                <li><a className="dropdown-item" href="/Fianca"><i className='material-icons-outlined'>note_alt</i>Fiança</a></li>
                

            </ul>
            </li>
            <li className="nav-item dropdown" style={{ display: 'none'}}>
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
                <div className="parent-icon"><i className='material-icons-outlined'>engineering</i>
                </div>
                <div className="menu-title d-flex align-items-center">Administração</div>
                <div className="ms-auto dropy-icon"><i className='material-icons-outlined'>expand_more</i></div>
            </a>
            <ul className="dropdown-menu">

                <li><a className="dropdown-item" href="/Usuarios"><i className='material-icons-outlined'>group</i>Usuários</a></li>
                
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


    <ModalSenha show={show} now={now} setShow={setShow} />



    <Toaster
        position="top-right" // Posição no canto superior direito
        toastOptions={{
            style: {
                padding: "16px",
                color: "#fff",
            },
            success: {
                style: {
                    background: "#4caf50", // Verde
                },
            },
            error: {
                style: {
                    background: "#f44336", // Vermelho
                },
            },
            loading: {
                style: {
                    background: "#ff9800", // Laranja
                },
            },

        }}
    />



    </div>

    )

}

export default Layout