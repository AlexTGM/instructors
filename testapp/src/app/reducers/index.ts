import {
  Action,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';
import { InstructorsService, Instructor } from '../app.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMapTo, switchMap, mapTo } from 'rxjs/operators';

import { Effect, ofType, Actions } from '@ngrx/effects';

export enum ActionTypes {
  LoadInit       = '[instructors] LoadInit',
  LoadFinished   = '[instructors] LoadFinished',
  CreateInit     = '[instructors] CreateInit',
  EditInit       = '[instructors] EditInit',
  DeleteInit     = '[instructors] DeleteInit'
}

export class LoadInit implements Action {
  readonly type = ActionTypes.LoadInit;
}

export class LoadFinished implements Action {
  readonly type = ActionTypes.LoadFinished;
  constructor(public payload: Instructor[]) { }
}

export class DeleteInit implements Action {
  readonly type = ActionTypes.DeleteInit;
  constructor(public id: number) { }
}

export class CreateInit implements Action {
  readonly type = ActionTypes.CreateInit;
  constructor(public payload: Instructor) { }
}

export class EditInit implements Action {
  readonly type = ActionTypes.EditInit;
  constructor(public payload: Instructor) { }
}

export type InstructorsActions = LoadInit | LoadFinished
  | DeleteInit | CreateInit | EditInit;

export interface InstructorsState {
  instructors: Instructor[];
}

export const initialState: InstructorsState = {
  instructors: []
}

export function instructorsReducer(state = initialState, action: InstructorsActions): InstructorsState {
  switch (action.type) {
    case ActionTypes.LoadFinished: {
      return { ...state, instructors: action.payload }
    }
    default: return state;
  }
}

@Injectable()
export class InstructorsEffects {
  constructor(private actions$: Actions, private service: InstructorsService) { }

  @Effect()
  loadInitEffect$: Observable<Action> = this.actions$.pipe(
      ofType<LoadInit>(
          ActionTypes.LoadInit
      ),
      switchMapTo(this.service.getAll().pipe(
        map(instructors => {
          return new LoadFinished(instructors)
        })
      ))
  );

  @Effect()
  deleteInitEffect$: Observable<Action> = this.actions$.pipe(
      ofType<DeleteInit>(
          ActionTypes.DeleteInit
      ),
      switchMap(action => this.service.delete(action.id).pipe(
        mapTo(new LoadInit())
      ))
  );

  @Effect()
  createInitEffect$: Observable<Action> = this.actions$.pipe(
      ofType<CreateInit>(
          ActionTypes.CreateInit
      ),
      switchMap(action => this.service.create(action.payload).pipe(
        mapTo(new LoadInit())
      ))
  );

  @Effect()
  editInitEffect$: Observable<Action> = this.actions$.pipe(
      ofType<EditInit>(
          ActionTypes.EditInit
      ),
      switchMap(action => this.service.edit(action.payload).pipe(
        mapTo(new LoadInit())
      ))
  );
}

export const selectInstructorsState: MemoizedSelector<object, InstructorsState>
    = createFeatureSelector<InstructorsState>('instructors');


