import {Component , OnInit} from "@angular/core"
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { ILogin } from "src/app/types/data";

@Component({
    selector : "app-login" , 
    templateUrl : "./login.component.html"
})
export class LoginComponent implements OnInit {
    public mail : string = ""
    public password : string = ""
    public isLoading : boolean = false
    public hasMailError : boolean = false
    public hasPasswordError : boolean = false
    public hasLoginError : boolean = false
    public errMessage : string = ''

    constructor(
        private authService : AuthService , 
        private router : Router ,
        private userService : UserService
    ){}

    ngOnInit(){
    }

    setNewValue(e:Event , id  :string){
        this.hasLoginError = false
        switch (id) {
            case "mail":
                this.hasMailError = false
                this.mail = (e.target as HTMLInputElement).value
                break;
            case "password":
                this.hasPasswordError = false
                this.password = (e.target as HTMLInputElement).value                
                break;        
            default:
                break;
        }
    }

    handleSubmit(e : Event){
        e.preventDefault()
        this.isLoading = true
        const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!mailRegex.test(this.mail)) {
            this.hasMailError = true
        }
        if (this.password.length < 6) {
            this.hasPasswordError = true
        }
        if (!this.hasMailError || !this.hasPasswordError) {
            const data : ILogin = { mail : this.mail , password : this.password}
            this.authService.login(data).toPromise()
            .then((e:any) => {
                this.authService.setToken(e)
                this.userService.getData()
                this.router.navigate(['/projects'])
            })
            .catch((err:any)=>{
                this.hasLoginError = true
                this.errMessage =  err.error.message
            })
        } 
        this.isLoading = false
    }
}