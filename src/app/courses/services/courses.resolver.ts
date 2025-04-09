import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CourseEntityService } from "./course-entity.service";
import { filter, first, map, tap } from "rxjs/operators";


@Injectable()
export class CoursesResolver implements Resolve<boolean>{
    
    constructor(private coursesService: CourseEntityService){}
    
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean>{
        //returns data: list of courses 
        // need entity service 

        return this.coursesService.loaded$
        .pipe(
            tap(loaded => {
                //determine if we should load or nah 
                if(!loaded){
                    this.coursesService.getAll()
                }
            }),
            filter(loaded => !!loaded), // filter only true values
            first() // first value emitted, observable = completed 

        );  

       
    }
    
}