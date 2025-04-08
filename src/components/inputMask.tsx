import * as React from 'react';

export const maskMoney = (event: React.FormEvent<HTMLInputElement>) => {
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, '')
    .replace(/(\d)(\d{2})$/, '$1,$2')
    .replace(/(?=(\d{3})+(\D))\B/g, '.');
};

export const maskCNPJ = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 18;
  const { value } = event.currentTarget;

  return value
    .replace(/\D/g, '') // Remove tudo que não for número
    .replace(/(\d{2})(\d)/, '$1.$2') // Adiciona o primeiro ponto
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
    .replace(/(\d{3})(\d)/, '$1/$2') // Adiciona a barra
    .replace(/(\d{4})(\d{1,2})/, '$1-$2') // Adiciona o traço
    .replace(/(-\d{2})\d+?$/, '$1'); // Garante que não ultrapasse o tamanho correto
};

export const maskCPF = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 15;
  const { value } = event.currentTarget;

  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const maskPhone = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 15;
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})/, '$1-$2');
};

export const maskPhoneFixo = (event: React.FormEvent<HTMLInputElement>) => {
  // O comprimento máximo para (00) 0000-0000 é 14 caracteres:
  // ( -> 1, 2 dígitos -> 2, ) -> 1, espaço -> 1, 4 dígitos -> 4, hífen -> 1, 4 dígitos -> 4, total = 14
  event.currentTarget.maxLength = 14;
  const { value } = event.currentTarget;
  // Remove tudo que não for dígito e aplica a máscara
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
};


export const maskCEP = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 9;
  const { value } = event.currentTarget;
  return value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2');
};

export const maskDate = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 10;
  const { value } = event.currentTarget;

  return value
    .replace(/\D/g, '') // Remove tudo que não for número
    .replace(/^(\d{2})(\d{2})?/, '$1/$2') // Adiciona a primeira barra após o dia
    .replace(/^(\d{2}\/\d{2})(\d{4})?/, '$1/$2'); // Adiciona a segunda barra antes do ano
};


export type MaskTypes = 'cpf' | 'money' | 'phone' | 'phoneFixo' | 'cep' | 'cnpj' | 'date';

type Masks = Record<
  MaskTypes,
  (event: React.FormEvent<HTMLInputElement>) => string
>;

const masks: Masks = {
  cpf: maskCPF,
  money: maskMoney,
  phone: maskPhone,
  phoneFixo: maskPhoneFixo,
  cep: maskCEP,
  cnpj: maskCNPJ,
  date: maskDate,
};

export default masks;