import { Injectable } from "@angular/core";
import { ILogin, ISignup, IVerifyToken } from "../types/data";
import {CookieService} from "ngx-cookie-service"
import { apiUrl, tokenKey } from "../constant/constant";
import {HttpClient} from "@angular/common/http"
import { Observable } from "rxjs";
import { SigninResponseType } from "../types/response.type";

@Injectable()
export class AuthService {

    constructor(
        private cookieService : CookieService ,
        private http : HttpClient
    ){}

    getToken(){
        return this.cookieService.get(tokenKey)
    }

    setToken({token} :any){
        this.cookieService.set(tokenKey , token )
    }
    
    logout(){
        this.cookieService.delete(tokenKey)
    }

    login(data : ILogin){
        return this.http.post(`${apiUrl}user/login` , data )
    }

    signup(data : ISignup){
        return this.http.post(`${apiUrl}user` , data )
    }

    verifyToken(data : IVerifyToken ){
        return this.http.get(`${apiUrl}user/verify/${data.token}`)
    }

    getInfo():Observable<any>{
        return this.http.get(apiUrl + "user")
    }

}