import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarvelService } from 'src/app/marvel.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  fb = inject(FormBuilder);
  formGroup! : FormGroup;
  svc = inject(MarvelService);
  isLoading = false;
  
  ngOnInit(){
    this.formGroup = this.fb.group({
      name : this.fb.control<string>('', Validators.required)
    })
  }

  processForm(){
    this.isLoading = true;
    this.svc.getCharacterList(this.formGroup.value['name'], 0).catch(error => {
      this.isLoading = false;
      alert("Error: Please try again.");
      this.formGroup.reset()
    })
  }
}
