import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  mChar!: MarvelCharacter;
  comments: string[] = [];
  formGroup!: FormGroup;
  fb = inject(FormBuilder);


  ngOnInit() {
    this.svc.getCharacterById(this.route.snapshot.params['id']).then(
      data => {
        let mChar = new MarvelCharacter();
        mChar.id = (data as any).id;
        mChar.name = (data as any).name;
        mChar.thumbnail = (data as any).thumbnail;
        this.mChar = mChar;
        this.svc.getComments(mChar.id).then(
          list => {
            for (let c of (list as any[])) {
              this.comments.push(c.comments)
            }
          }
        );
      }
    )
    this.formGroup = this.fb.group({
      comments : this.fb.control<string>('', Validators.required)
    })
  }

  processForm(){
    this.svc.saveComments(this.formGroup.value['comments'], this.route.snapshot.params['id']).then(()=>{
      window.location.reload();
    })
  }
}

