import { Pipe, PipeTransform } from '@angular/core';
import { MusicasAllDto } from '../model/MusicasAll.dto';

@Pipe({name: 'filterByName'})
export class FilterByName implements PipeTransform{
    transform(musicas: MusicasAllDto[], nameQuery: string) {
        nameQuery = nameQuery
        .trim()
        .toLowerCase()

        if(nameQuery) {
            return musicas.filter(musica =>
                musica.nome.toLowerCase().includes(nameQuery));
        } else {
            return musicas;
        }
    }

}