import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, } from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn : "root"
})
export class GuestGuard implements CanActivate{

    constructor(
        private userService : UserService , 
        private router : Router
    ){}

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
       const data = await this.userService.getData()       
       if (data) {
            console.log('user found in guest guard');
            this.router.navigate(['/projects'])        
            return false
       }else{
           return true
       }
    }
}