import { Equipe } from './equipe';
import { MusicaRepertorio } from './MusicaRepertorio';

export interface Repertorio {
    id?: number;
    data?: string;
    criador?: string;
    totalMusicas?: number;
    equipeDoDia?: Equipe;
    musicasRepertorio?: MusicaRepertorio[]
}