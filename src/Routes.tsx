import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/protected.route'

import Layout from './components/Layout'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Usuarios from './pages/Usuarios'


import PropostaCadastro from './pages/PropostaCadastro'
import FormIntro from './pages/FormIntro'

import CadastroConvite from './pages/CadastroConvite'
import Corretor from './pages/Corretor'


const Rotas = () => {

    return (

        <BrowserRouter>

            <Routes>

                <Route path='/' element={<Login />} />  
                <Route path='/03!ZXqW771/:cliente_id/:chaveLink' element={<CadastroConvite />} />

                <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                        
                        <Route path='/Dashboard' element={<Dashboard />} />
                        
                        <Route path='/Produtor' element={<FormIntro tipo='Produtor' />} />
                        <Route path='/Corretor' element={<Corretor/>} />
                        <Route path='/Afiancado' element={<FormIntro tipo='Afiançado' />} />
                        <Route path='/Beneficiario' element={<FormIntro tipo='Beneficiário' />} />
                        
                        <Route path='/Proposta' element={<PropostaCadastro />} />

                        <Route path='/Usuarios' element={<Usuarios />} />
                        
                </Route>



            </Routes>

        
        </BrowserRouter>

    )


}

export default Rotas