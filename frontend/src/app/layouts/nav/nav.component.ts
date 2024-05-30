import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { UserContext } from "src/app/types/user-context";

@Component({
    selector  : 'app-nav' , 
    templateUrl : "./nav.component.html"
})

export class NavComponent {
    constructor(
        private userservice : UserService ,
        private authService : AuthService , 
        private router : Router
    ){
    }

    public user : any = null

    public showDropdown : boolean = false

    async ngOnInit() {
        this.user = await this.userservice.getData()
        console.log(this.user , 'ici le user');
        
        this.router.events.subscribe(async(event)=>{
            if (event instanceof NavigationEnd) {
                this.user = await this.userservice.getData()
            }
        })
    }

    handleSignOut(){
        this.authService.logout()
        this.userservice.removeContext()
        this.showDropdown = false
        this.router.navigate(["/"])
    }
    toggleDropdown(){
        this.showDropdown = !this.showDropdown
    }

}