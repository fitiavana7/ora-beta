import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { ISignup } from "src/app/types/data";
import { SigninResponseType } from "src/app/types/response.type";

@Component({
    selector : "app-signin" , 
    templateUrl  : "./signin.component.html"
})
export class SigninComponent{
    public mail : string = ""
    public username : string = ""
    public password1 : string = ""
    public password2 : string = ""
    public hasMailError : boolean = false
    public hasUsernameError : boolean = false
    public hasPasswordError : boolean = false
    public pwd1topwd2Error : boolean = false
    public hasLoginError : boolean = false
    public errMessage : string = ''
    constructor(
        private authService : AuthService ,
        private userService : UserService ,
        private router : Router
    ){}

    setNewValue(e:Event , id  :string){
        this.hasLoginError = false
        switch (id) {
            case "mail":
                this.hasMailError = false
                this.mail = (e.target as HTMLInputElement).value
                break;
            case "username":
                this.hasUsernameError = false
                this.username = (e.target as HTMLInputElement).value                
                break;
            case "password1":
                this.hasPasswordError = false
                this.password1 = (e.target as HTMLInputElement).value                
                break;     
            case "password2":
                this.password2 = (e.target as HTMLInputElement).value                
                if (this.password1 !== this.password2) {
                    this.pwd1topwd2Error = true
                }
                else{
                    this.pwd1topwd2Error = false
                }
                break;   
            default:
                break;
        }
    }

    handleSubmit(e:Event){
        e.preventDefault()
        const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!mailRegex.test(this.mail)) {
            this.hasMailError = true
        }
        if (this.password1.length < 6) {
            this.hasPasswordError = true
        }
        if (this.username.length < 6) {
            this.hasUsernameError = true
        }
        if (!this.hasMailError || !this.hasUsernameError || !this.hasPasswordError) {
            const data : ISignup = {mail  : this.mail , username : this.username , password : this.password1}
            this.authService.signup(data).toPromise()
            .then((e:any) =>{
                this.authService.setToken(e)    
                this.userService.getData()
                this.router.navigate(['/projects'])            
            })
            .catch((err:any)=>{
                this.hasLoginError = true 
                this.errMessage = err.error.message
                
            })             
        }
    }

}