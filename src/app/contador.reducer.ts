import {createReducer, on} from '@ngrx/store';
//importamos los estados del archivo contador.action.ts
import * as states from './contador.action';

export const initial = 1;

const _counterReducer = createReducer(
  initial,
  on(states.inc, state => state + 1),
  on(states.dec, state => state - 1),
  on(states.ig, state => state = 1),
);

export function counterReducer(state, action){
  return _counterReducer(state, action);
}
