import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from './app.module';
import { LoadInit, selectInstructorsState, DeleteInit, CreateInit, EditInit } from './reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Instructor } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'testapp';

  instructors$: Observable<Instructor[]>;
  selected: Instructor = {id: null, first_name: null, last_name: null};

  constructor(private store$: Store<RootStoreState>) { }

  delete(instructor: Instructor) {
    this.store$.dispatch(new DeleteInit(instructor.id));
  }

  select(instructor: Instructor) {
    this.selected = {...instructor};
  }

  save() {
    if (this.selected.id !== null) {
      this.store$.dispatch(new EditInit(this.selected));
    } else {
      this.store$.dispatch(new CreateInit(this.selected));
    }

    this.selected = {id: null, first_name: null, last_name: null};
  }

  ngOnInit() {
    this.store$.dispatch(new LoadInit());

    this.instructors$ = this.store$.select(selectInstructorsState).pipe(
      map(state => state.instructors)
    );

    this.instructors$.subscribe(instructors => console.log(instructors))
  }
}
