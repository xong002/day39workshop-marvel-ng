import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchFormComponent } from './component/search-form/search-form.component';
import { CharacterListComponent } from './component/character-list/character-list.component';
import { CharacterDetailsComponent } from './component/character-details/character-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    CharacterListComponent,
    CharacterDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
