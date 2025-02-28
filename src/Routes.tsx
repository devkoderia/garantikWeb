import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import UsuariosLista from './pages/UsuariosLista'

import Cadastro from './pages/Cadastro'
import Lista from './pages/Lista'


const Rotas = () => {

    return (

        <BrowserRouter>

            <Routes>

                <Route path='/' element={<Login />} />  

                <Route element={<Layout />}>

                    
                    <Route path='/Dashboard' element={<Dashboard />} />
                    <Route path='/Produtor/Cadastro' element={<Cadastro tipo='Produtor' />} />
                    <Route path='/Corretor/Cadastro' element={<Cadastro tipo='Corretor' />} />
                    
                    <Route path='/Produtor/Lista' element={<Lista tipo='Produtor' />} />
                    <Route path='/Corretor/Lista' element={<Lista tipo='Corretor' />} />

                    <Route path='/Usuarios/Lista' element={<Lista tipo='Corretor' />} />


                </Route>


            </Routes>

        
        </BrowserRouter>

    )


}

export default Rotas