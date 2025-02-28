import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProdutorCadastro from './pages/ProdutorCadastro'
import ProdutorLista from './pages/ProdutorLista'
import UsuariosLista from './pages/UsuariosLista'

const Rotas = () => {

    return (

        <BrowserRouter>

            <Routes>

                <Route path='/' element={<Login />} />  

                <Route element={<Layout />}>

                    
                    <Route path='/Dashboard' element={<Dashboard />} />
                    <Route path='/Produtor/Cadastro' element={<ProdutorCadastro />} />
                    <Route path='/Produtor/Lista' element={<ProdutorLista />} />
                    <Route path='/Usuarios/Lista' element={<UsuariosLista />} />


                </Route>


            </Routes>

        
        </BrowserRouter>

    )


}

export default Rotas