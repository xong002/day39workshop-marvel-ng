import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MarvelCharacter } from './model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  http = inject(HttpClient);
  characterList!: MarvelCharacter[];
  router = inject(Router);

  getCharacterList(name: string, offset: number) {
    return firstValueFrom(this.http.get('/characters', { params: { nameStartsWith: name, offset: offset } })).then(
      data => {
        this.characterList = [];
        const dataArray: [] = (data as any).data.results;
        for (let i of dataArray) {
          let mChar = new MarvelCharacter();
          mChar.id = (i as any).id;
          mChar.name = (i as any).name;
          this.characterList.push(mChar);
        }
        console.log(this.characterList);
        this.router.navigate(["/characters/" + name]);
      }
    );
  }

  getCharacterById(id : number){
    return firstValueFrom(this.http.get('/character/' + id));
  }

  getComments(charId : number){
    return firstValueFrom(this.http.get('/character/' + charId + '/comments'));
  }

  saveComments(comments: string, charId: number){
    return firstValueFrom(this.http.post('/character/' + charId, {comments: comments}))
  }
}
