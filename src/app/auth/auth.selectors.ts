import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

export const selectAuthState = createFeatureSelector<AuthState>("auth")

export const isLoggedIn = createSelector(
    //mapping function returns access to some slice of state in store
    // state=> state["auth"],

    //use feature selector as mapping, 
    selectAuthState,
    // state => state["courses"]
    //final arg is the projector function, takes slice(s) of state
    //and return a value 
    (authState) => !!authState.user

)

export const isLoggedOut = createSelector(
    //above selector is a mapping func, returns a boolean
    isLoggedIn,
    //take boolean and return a value. 
    loggedIn => !loggedIn
)