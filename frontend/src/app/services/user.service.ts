import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { apiUrl } from "../constant/constant";
import { UserContext } from "../types/user-context";
import { AuthService } from "./auth.service";
import {HttpClient} from "@angular/common/http"

@Injectable()
export class UserService {

    public user : any

    constructor(
        private authService : AuthService ,
        private http : HttpClient
    ){}

    async getData() {
        const token = this.authService.getToken()
        if (!token) {
            return null
        }        
        return await this.authService.verifyToken({token}).toPromise()
    }

    async verifyRoot(){
        const token = this.authService.getToken()
        let data : any = {}
        if (!token) {
            return data;
        }
        data = await this.authService.verifyToken({token}).toPromise()
        return data
    }

    saveContext(data :any){
        this.user = data
    }

    removeContext(){
        this.user = null
    }

    getInfoById(id : string){
        return this.http.get(`${apiUrl}user/${id}` )
    }

}