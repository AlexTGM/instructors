import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InstructorsService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { instructorsReducer, InstructorsEffects, InstructorsState } from './reducers';

@NgModule({
  imports: [
    StoreModule.forFeature('instructors', instructorsReducer),
    EffectsModule.forFeature([InstructorsEffects])
  ],
  providers: [InstructorsEffects]
})
export class GithubStoreModule { }

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  
    GithubStoreModule
  ]
})
export class RootStoreModule { }

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RootStoreModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [InstructorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export interface RootStoreState {
  instructors: InstructorsState;
}
