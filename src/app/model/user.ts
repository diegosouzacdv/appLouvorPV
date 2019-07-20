import { Funcao } from './funcao';
export interface User {
    id?: number;
    email?: string;
    ativo?: boolean;
    imageUrl?: string;
    funcao?: Funcao[];
    igreja?: {
        id?: number,
        nome?: string
    };
    pessoa?: {
        nome?: string,
        telefone?: string
      }
      ;
    perfis?: string [];
}

