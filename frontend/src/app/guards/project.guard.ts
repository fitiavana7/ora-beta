import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, } from "@angular/router";
import { UserService } from "../services/user.service";
import { ProjectService } from "../services/project.service";

@Injectable({
    providedIn : "root"
})
export class ProjectGuard implements CanActivate{

    constructor(
        private userService : UserService , 
        private projectService : ProjectService ,
        private router : Router
    ){}

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const id = next.url[1].path;
        const data = await this.projectService.verifyProjectById(id)        
        if (data) {
            return true
       }else{
           console.log('project not available');        
           this.router.navigate(['/projects'])
           return false
       }

    }
}