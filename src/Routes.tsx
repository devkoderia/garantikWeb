import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import UsuariosLista from './pages/UsuariosLista'

import Cadastro from './pages/Cadastro'
import Lista from './pages/Lista'

import PropostaCadastro from './pages/PropostaCadastro'
import UsuarioCadastro from './pages/UsuarioCadastro'


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

                    <Route path='/Afiancado/Cadastro' element={<Cadastro tipo='Afiançado' />} />
                    <Route path='/Afiancado/Lista' element={<Lista tipo='Afiançado' />} />

                    <Route path='/Beneficiario/Cadastro' element={<Cadastro tipo='Beneficiário' />} />
                    <Route path='/Beneficiario/Lista' element={<Lista tipo='Beneficiário' />} />


                    <Route path='/Proposta/Cadastro' element={<PropostaCadastro />} />

                    <Route path='/Usuarios/Cadastro' element={<UsuarioCadastro />} />
                    <Route path='/Usuarios/Lista' element={<Lista tipo='Usuários' />} />


                </Route>


            </Routes>

        
        </BrowserRouter>

    )


}

export default Rotas