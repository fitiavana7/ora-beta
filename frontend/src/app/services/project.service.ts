import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { IProject , IAddMember } from "../types/data";
import { apiUrl } from "../constant/constant";

@Injectable()
export class ProjectService {

    constructor(
        private http : HttpClient
    ){}

    create(data  : IProject){
        return this.http.post(`${apiUrl}project` , data)
    }

    getAll(){
        return this.http.get(`${apiUrl}project`)
    }

    deleteProject(id : string){
        return this.http.delete(`${apiUrl}project/${id}`)
    }

    getById(id : string){
        return this.http.get(`${apiUrl}project/${id}`)
    }

    verifyProjectById(id : string){
        return this.http.get(`${apiUrl}project/${id}`).toPromise()
    }

    addMember(data : IAddMember){
        return this.http.post(`${apiUrl}project/members` , data)
    }

    getProjectMembers(id : string){
        return this.http.get(`${apiUrl}project/members/${id}`)
    }

    getProjectByUser(id : string){
        return this.http.get(`${apiUrl}project/user/${id}`)
    }

}