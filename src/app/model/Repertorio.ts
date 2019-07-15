import { Equipe } from './equipe';
import { Musica } from './Musica';

export interface Repertorio {
    id: number;
    data: string;
    criador: string;
    totalMusicas: number;
    equipeDoDia: Equipe;
    musicasRepertorio: Musica[]
    
}