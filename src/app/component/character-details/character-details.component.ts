import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from 'src/app/marvel.service';
import { MarvelCharacter } from 'src/app/model';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent {
  svc = inject(MarvelService);
  route = inject(ActivatedRoute);
  mChar! : MarvelCharacter;

  ngOnInit(){
    this.svc.getCharacterById(this.route.snapshot.params['id']).then(
      data => {
        let mChar = new MarvelCharacter();
        mChar.id = (data as any).id;
        mChar.name = (data as any).name;
        mChar.thumbnail = (data as any).thumbnail;
        this.mChar = mChar;
      }
    )
  }
}
