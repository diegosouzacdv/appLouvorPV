import { Funcao } from './funcao';
import { Igreja } from './igreja';
export interface UsuarioDto {
    id: string;
    pessoa: {
        nome: string;
        telefone: string;
    }
    email: string;
    imageUrl?: string;
    ativo: string;
    funcao: Funcao[];
    igreja: Igreja;
}