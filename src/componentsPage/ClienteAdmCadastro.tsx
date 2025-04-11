import { useEffect, useState, forwardRef, ReactElement } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import toast from 'react-hot-toast';
import TextInput from '../components/TextInput'
import api from '../components/api';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button2 from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { validaCNPJ, validaCPF, validaEmail } from '../components/generalFunctions';
import moment from 'moment';

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children: ReactElement<any, any> },
    ref
) {
    return <Slide direction="up" ref={ref} {...props} />;
});



interface IUF {
    uf_codigo: string;
    uf_descri: string;
}

interface IMunicipio {
    ibge_codigo: string;
    ibge_descri: string;
}




const ClienteAdmCadastro = (props: any) => {


    
    const [open, setOpen] = useState<boolean>(false)
    const [acao, setAcao] = useState<string | undefined>('')
    const [titulo, setTitulo] = useState<string | undefined>('')
    const [frase, setFrase] = useState<string | undefined>('')

    const [cnpj, setCnpj] = useState<string>('')
    const [nomeFantasia, setNomeFantasia] = useState<string>('')
    const [razaoSocial, setRazaoSocial] = useState<string>('')
    const [cep, setCep] = useState<string>('')
    const [ibge_codigo, setIbge_codigo] = useState<string>('')
    const [ibge_descri, setIbge_descri] = useState<string>('')
    const [municipios, setMunicipios] = useState<React.ReactNode[]>([])
    const [logradouro, setLogradouro] = useState<string>('')
    const [numero, setNumero] = useState<string>('')
    const [complemento, setComplemento] = useState<string>('')
    const [bairro, setBairro] = useState<string>('')
    const [telefoneFixo, setTelefoneFixo] = useState<string>('')
    const [telefoneCelular, setTelefoneCelular] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [pessoaContato, setPessoaContato] = useState<string>('')
    const [emailPessoaContato, setEmailPessoaContato] = useState<string>('')
    const [telefoneFixoPessoaContato, setTelefoneFixoPessoaContato] = useState<string>('')
    const [telefoneCelularPessoaContato, setTelefoneCelularPessoaContato] = useState<string>('')
    const [observacao, setObservacao] = useState<string>('')

    const [cnae, setCnae] = useState<string>('')
    const [cnaeDescricao, setCnaeDescricao] = useState<string>('')
    const [capitalSocial, setCapitalSocial] = useState<string>('')
    const [naturezaJuridica, setNaturezaJuridica] = useState<string>('')
    const [situacao, setSituacao] = useState<string>('')
    const [dataAbertura, setDataAbertura] = useState<string>('')
    const [dataUltimaAtualizacao, setDataUltimaAtualizacao] = useState<string | undefined>()
    const [tipoEmpresa, setTipoEmpresa] = useState<string>('')
    const [porte, setPorte] = useState<string>('')
    const [dataSituacao, setDataSituacao] = useState<string>('')
    const [motivoSituacao, setMotivoSituacao] = useState<string>('')
    const [situacaoEspecial, setSituacaoEspecial] = useState<string>('')
    const [dataSituacaoEspecial, setDataSituacaoEspecial] = useState<string>('')

    const [validadoCNPJ, setValidadoCNPJ] = useState<boolean>(false)
    const [ufs, setUfs] = useState<React.ReactNode[]>([])
    const [uf, setUf] = useState<string>('')



    const listaMunicipios = async () => {

        if (uf) {

            try {
                const resultado = await api.get<IMunicipio[]>(`listaMunicipios/${uf}`);
                setMunicipios(resultado.data.map((rs) =>
                
                    <option key={rs.ibge_codigo} value={rs.ibge_codigo}>
                        {rs.ibge_descri}
                    </option>
                
                
                ));
            } catch (error) {
                console.error('Erro ao buscar UFs:', error);
            }

        }

        
    };


    const listaUf = async () => {
        try {
            const resultado = await api.get<IUF[]>('listaUf');
            setUfs(resultado.data.map((rs) =>
                
                    <option key={rs.uf_codigo} value={rs.uf_codigo}>
                        {rs.uf_descri}
                    </option>
                
            
            ));
        } catch (error) {
            console.error('Erro ao buscar UFs:', error);
        }
    };



    const verificaCEP = (cep: string) => {



        if (cep.replaceAll('-', '').replaceAll('.', '').length >= 8) {

            axios.get(`https://viacep.com.br/ws/${cep.replaceAll('-', '')}/json`).then((result) => {

                //console.log(result.data)

                setLogradouro(result.data.logradouro)
                setComplemento(result.data.complemento)
                setBairro(result.data.bairro)
                setIbge_codigo(result.data.ibge)
                setIbge_descri(result.data.localidade)
                setUf(result.data.uf)

            }).catch((err) => {

                console.log(err.response)

            })

        }

    }




    const consultaCNPJ = async () => {

        try {

            var resultado = await api.get(`consultaCNPJ/${cnpj.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '')}`)
            return resultado.data

        } catch(err) {

            return err

        }

        

    }



    const verificaCNPJ = async () => {


        if (!validaCNPJ(cnpj.replaceAll('.', '').replaceAll('-', '').replaceAll('/', ''))) {

            toast.error('CNPJ inválido!')
            return false

        } else {

            var data = await consultaCNPJ()
            
            if (data) {

                setValidadoCNPJ(true)
                setRazaoSocial(data.nome)
                setNomeFantasia(data.fantasia)
                setNaturezaJuridica(data.natureza_juridica)
                setTipoEmpresa(data.tipo)
                setPorte(data.porte)
                setCapitalSocial(
                    data.capital_social
                      ? Number(data.capital_social).toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : ''
                  )

                setCnae(data.atividade_principal[0].code)
                setCnaeDescricao(data.atividade_principal[0].text)
                setSituacao(data.situacao)
                setDataSituacao(data.data_situacao)
                setMotivoSituacao(data.motivo_situacao)
                setSituacaoEspecial(data.situacao_especial)
                setDataSituacaoEspecial(data.data_situacao_especial)
                setDataAbertura(data.abertura)
                setDataUltimaAtualizacao(data.ultima_atualizacao ? moment(data.ultima_atualizacao).utc().format('DD/MM/YYYY HH:mm:ss') : undefined)

                setLogradouro(data.logradouro)
                setNumero(data.numero)
                setBairro(data.bairro)
                setComplemento(data.complemento)
                setUf(data.uf)
                setCep(data.cep ? data.cep.replaceAll('.', '') : '')
                    
                verificaCEP(data.cep ? data.cep.replaceAll('.', '') : '')

            }


        }


    }


    useEffect(() => {

        listaUf();
        

    }, [])


    useEffect(() => {
        listaMunicipios();
    }, [uf]);


    const validaSalvar = () => {




    }

    const salva = () => {



    }



    return (

        <div>


                <div className="row g-3">

                    <div className="col-md-3">
                        <label className="form-label">CNPJ</label>
                        <TextInput placeholder="00.000.000/0000-00" 
                        maskType="cnpj" 
                        type="text" 
                        className="form-control" 
                        disabled={ props.corretor_id }
                        style={{ backgroundColor: '#e9f2f1' }} onBlur={verificaCNPJ} value={cnpj} onChange={event => setCnpj(event.target.value)} />
                    </div>
                    <div className="col-md-9">
                        <label className="form-label">Razão Social</label>
                        <input type="text" className="form-control" value={razaoSocial} disabled />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Nome Fantasia</label>
                        <input type="text" className="form-control" value={nomeFantasia} disabled />
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Natureza Jurídica</label>
                        <input type="text" className="form-control" disabled value={naturezaJuridica} />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Tipo da Empresa</label>
                        <input type="text" className="form-control" disabled value={tipoEmpresa} />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Porte</label>
                        <input type="text" className="form-control" disabled value={porte} />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Capital Social R$</label>
                        <input type="text" className="form-control" disabled value={capitalSocial} />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">CNAE</label>
                        <input type="text" className="form-control" disabled value={cnae} />
                    </div>
                    <div className="col-md-9">
                        <label className="form-label">Descrição do CNAE</label>
                        <input type="text" className="form-control" disabled value={cnaeDescricao} />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Situação</label>
                        <input type="text" className="form-control" disabled value={situacao} />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Data da situação</label>
                        <input type="text" className="form-control" disabled value={dataSituacao} />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Motivo da situação</label>
                        <input type="text" className="form-control" disabled value={motivoSituacao} />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Situação especial</label>
                        <input type="text" className="form-control" disabled value={situacaoEspecial} />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Data da situação especial</label>
                        <input type="text" className="form-control" disabled value={dataSituacaoEspecial} />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Data de abertura</label>
                        <input type="text" className="form-control" disabled value={dataAbertura} />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Última atualização na receita</label>
                        <input type="text" className="form-control" disabled value={dataUltimaAtualizacao} />
                    </div>


                        <div className="col-md-2">
                            <label className="form-label">CEP</label>
                            <TextInput placeholder="00000-000" maskType="cep" type="text" className="form-control" value={cep} onChange={event => setCep(event.target.value)} onBlur={event => verificaCEP(event.target.value)} />
                        </div>
                        <div className="col-md-7">
                            <label className="form-label">Logradouro</label>
                            <input type="text" className="form-control" value={logradouro} maxLength={500} onChange={event => setLogradouro(event.target.value)} />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Complemento</label>
                            <input type="text" className="form-control" value={complemento} maxLength={100} onChange={event => setComplemento(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Bairro</label>
                            <input type="text" className="form-control" value={bairro} maxLength={150} onChange={event => setBairro(event.target.value)} />
                        </div>
                        <div className="col-md-5">
                            <label className="form-label">Município</label>
                            <select
                                className="form-control"
                                value={ibge_codigo}
                                onChange={(e) => setIbge_codigo(e.target.value)}
                            >
                                <option value="">[Selecione]</option>
                                {municipios}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">UF</label>
                            <select className="form-control"
                                value={uf}
                                onChange={(e) => setUf(e.target.value)}
                            >

                                <option value="">[Selecione]</option>
                                {ufs}
                            </select>
                        </div>

                        
                    <div className="col-md-12" style={{ marginTop: 50, textAlign: 'right' }}>
                        
                                
                            <button type="button" className="btn btn-secondary" onClick={() => props.setShow(false)} style={{ marginLeft: 5 }}>Fechar</button>
                            <button type="button" className="btn btn-success" style={{ marginLeft: 5 }}>Salvar</button>
                        
                    </div>

            </div>



            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
                fullWidth
                >
                <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column" }}>

                    <div style={{ textAlign: 'justify' }}>
                        {frase}
                    </div>

                </DialogContent>
                <DialogActions>


                    <Button2 color="primary" variant="contained" onClick={() => setOpen(false)} style={{ display: acao == 'senhaAlterada' ? 'table-row' : 'none' }}>
                        Ok
                    </Button2>


                    <Button2 color="error" variant="contained" onClick={() => setOpen(false)} style={{ display: acao == '' ? 'table-row' : 'none' }}>
                        Cancelar
                    </Button2>
                    <Button2 color="success" variant="contained" onClick={() => salva()} style={{ display: acao == '' ? 'table-row' : 'none' }}>
                        Ok
                    </Button2>


                </DialogActions>
            </Dialog>


        </div>


    )

}

export default ClienteAdmCadastro