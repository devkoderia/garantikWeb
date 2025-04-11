import { useEffect, useState, forwardRef, ReactElement } from 'react';
import axios from 'axios';
import api from '../components/api';
import toast from 'react-hot-toast';
import TextInput from '../components/TextInput'
import { useForm, Controller } from "react-hook-form";
import CurrencyInput from '../components/CurrencyInput';
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



const ClienteAdmCobranca = (props: any) => {


    const { control, handleSubmit } = useForm({
        defaultValues: {
          valorMensalidade: "",
          valorAdesao: "",
        },
      });


    const [open, setOpen] = useState<boolean>(false)
    const [acao, setAcao] = useState<string | undefined>('')
    const [titulo, setTitulo] = useState<string | undefined>('')
    const [frase, setFrase] = useState<string | undefined>('')

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

    const [ufs, setUfs] = useState<React.ReactNode[]>([])
    const [uf, setUf] = useState<string>('')

    const [valorMensalidade, setValorMensalidade] = useState<string>('')
    const [valorAdesao, setValorAdesao] = useState<string>('')

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



    useEffect(() => {

        listaUf();
        

    }, [])


    useEffect(() => {
        listaMunicipios();
    }, [uf]);


    const salva = () => {

    }


    return (

        <div>
                <div className="row g-3">


                

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

                        <div className="col-md-3">
                            <label className="form-label">Valor Adesão R$:</label>
                            <Controller
                                name="valorAdesao"
                                control={control}
                                render={({ field }) => (
                                <CurrencyInput
                                    value={valorAdesao}
                                    onValueChange={(value) => field.onChange(value)} // Atualiza corretamente no RHF
                                    onChange={event => setValorAdesao(event.target.value)}
                                    placeholder="Digite um valor"
                                    className="form-control"
                                    
                                />
                                )}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Valor Mensalidade R$:</label>
                            <Controller
                                name="valorMensalidade"
                                control={control}
                                render={({ field }) => (
                                <CurrencyInput
                                    value={valorMensalidade}
                                    onValueChange={(value) => field.onChange(value)} // Atualiza corretamente no RHF
                                    onChange={event => setValorMensalidade(event.target.value)}
                                    placeholder="Digite um valor"
                                    className="form-control"
                                    
                                />
                                )}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Data último reajuste</label>
                            <input type="text" className="form-control"  />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Data vencimento</label>
                            <input type="text" className="form-control"  />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Índice reajuste</label>
                            <select className="form-control" >
                                <option value="">[Selecione]</option>
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

export default ClienteAdmCobranca