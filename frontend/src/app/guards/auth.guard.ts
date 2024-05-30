import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, } from "@angular/router";
import { catchError, map } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn : "root"
})
export class AuthGuard implements CanActivate{

    constructor(
        private userService : UserService , 
        private router : Router
    ){}

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const data = await this.userService.getData()
        if (data) {
             return true
        }else{
            console.log('no user found in auth guard');        
            this.router.navigate(['/'])
            return false
        }
     }
}