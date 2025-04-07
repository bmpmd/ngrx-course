import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AppState } from "../auth/reducers";
import { select, Store } from "@ngrx/store";
import { loadAllCourses } from "./course.actions";
import { filter, finalize, first, tap } from "rxjs/operators";
import { areCoursesLoaded } from "./courses.selector";

@Injectable()
export class CoursesResolver implements Resolve<any>{


    
    loading = false; 
    constructor(private store: Store<AppState>){
        
    }
    resolve(router: ActivatedRouteSnapshot,
            state: RouterStateSnapshot) : Observable<any>{


        //query store to see if 
        return this.store
        .pipe(
            select(areCoursesLoaded),
            tap(
                (coursesLoaded) =>{
                    if(!this.loading && !coursesLoaded){
                        this.loading = true
                        this.store.dispatch(loadAllCourses());
                    }
                       
                }
            ),
            filter(coursesLoaded => coursesLoaded),
            first(),
            finalize(() => this.loading = false)

        );
    }
}