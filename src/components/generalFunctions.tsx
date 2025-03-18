

export function validaEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function formataCPF(cpf: string): string {
    return cpf
        .replace(/\D/g, '') // Remove tudo que não for número
        .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto após os 3 primeiros dígitos
        .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto após os 3 próximos dígitos
        .replace(/(\d{3})(\d{2})$/, '$1-$2'); // Coloca um hífen antes dos últimos 2 dígitos
}

export function formataCEP(cep: string) {
    if (!cep || cep.length !== 8) return cep; // Retorna como está se for inválido

    return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

export function formataCNPJ(cnpj: string) {
    if (!cnpj || cnpj.length !== 14) return cnpj; // Retorna como está se for inválido

    return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
    );
}



export function validaCNPJ(str: any){

    

    str = str.replace('.','');
    str = str.replace('.','');
    str = str.replace('.','');
    str = str.replace('-','');
    str = str.replace('/','');
    var cnpj = str;
    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;
    if (cnpj.length < 14 && cnpj.length < 15)
        return false;
    for (i = 0; i < cnpj.length - 1; i++)
        if (cnpj.charAt(i) != cnpj.charAt(i + 1))
    {
        digitos_iguais = 0;
        break;
    }
    if (!digitos_iguais)
    {
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0,tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--)
        {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--)
        {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    else
        return false;
}


    

export function validaCPF(cpf: any) {

    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
            return false;
    for (i = 0; i < cpf.length - 1; i++)
            if (cpf.charAt(i) != cpf.charAt(i + 1))
                {
                digitos_iguais = 0;
                break;
                }
    if (!digitos_iguais)
            {
            numeros = cpf.substring(0,9);
            digitos = cpf.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;
            numeros = cpf.substring(0,10);
            soma = 0;
            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;
            return true;
            }
    else
        return false;

}

export function fmtMes(mes: any) {


    switch (parseInt(mes)) {

        case 1:
            return 'Janeiro'
            break;

        case 2:
            return 'Fevereiro'
            break;

        case 3:
            return 'Março'
            break;

        case 4:
            return 'Abril'
            break;

        case 5:
            return 'Maio'
            break;

        case 6:
            return 'Junho'
            break;

        case 7:
            return 'Julho'
            break;

        case 8:
            return 'Agosto'
            break;

        case 9:
            return 'Setembro'
            break;

        case 10:
            return 'Outubro'
            break;

        case 11:
            return 'Novembro'
            break;

        case 12:
            return 'Dezembro'
            break;



    }



}