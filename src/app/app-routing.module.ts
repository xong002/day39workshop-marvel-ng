import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchFormComponent } from './component/search-form/search-form.component';
import { CharacterDetailsComponent } from './component/character-details/character-details.component';
import { CharacterListComponent } from './component/character-list/character-list.component';

const routes: Routes = [
  { path: '', component: SearchFormComponent },
  { path: 'characters/:searchInput', component: CharacterListComponent },
  { path: 'character/:id', component: CharacterDetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
