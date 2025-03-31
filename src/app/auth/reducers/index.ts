import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../action-types';
import { routerReducer } from '@ngrx/router-store';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
}

export const initialAuthState: AuthState = {
  user: undefined
}


export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    }
  }
  ),

  on(AuthActions.logout, (state, action)=>{
    return {
      user: undefined
    }
  })

);

export interface AppState{

}
export  const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any>{
  return (state, action) => {
    console.log("state before: " + state);
    console.log("action ", action);
    return reducer(state, action)
  }
}
export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [logger] : [];
