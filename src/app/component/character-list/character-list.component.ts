import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from 'src/app/marvel.service';
import { MarvelCharacter } from 'src/app/model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent {
  characterList! : MarvelCharacter[];
  svc = inject(MarvelService);
  route = inject(ActivatedRoute);
  offset = 0;
  endOfResults = false;

  // TODO: store offset in service to maintain list position when using browser back button
  
  ngOnInit(){
    this.characterList = this.svc.characterList;
  }

  nextList(){
    this.offset += 20;
    this.svc.getCharacterList(this.route.snapshot.params['searchInput'], this.offset).then(() =>{
      if(this.svc.characterList.length === 0){
        this.offset -= 20;
        this.endOfResults = true;
        alert("No more resuls!")
      } else this.characterList = this.svc.characterList;
    });
  }

  previousList(){
    this.endOfResults = false;
    this.offset -= 20;
    this.svc.getCharacterList(this.route.snapshot.params['searchInput'], this.offset).then(() =>{
      this.characterList = this.svc.characterList;
    });
  }
}
