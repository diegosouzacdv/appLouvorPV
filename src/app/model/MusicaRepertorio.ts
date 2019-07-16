import { Grupo } from './grupo';
import { Categoria } from './categoria';
import { Estudo } from './estudo';
import { Tutorial } from './turorial';

export interface MusicaRepertorio {
    musica: {
    id?: number;
    nome?: string;
    dataInserida?: string;
    notaOriginal?: string,
    notaTocada?: string,
    grupo?: Grupo;
    categorias?: Categoria
    estudo?: Estudo,
    tutorial?: Tutorial
    }
}