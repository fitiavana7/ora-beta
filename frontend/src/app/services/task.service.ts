import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { IAddNewGroup, IAddNewItem, IChangeGroup, IGetStat, IGetTaskById, IGetTaskInfo } from "../types/data";
import { apiUrl } from "../constant/constant";

@Injectable()
export class TaskService {

    constructor(
        private http : HttpClient
    ){}

    createGroup(data  : IAddNewGroup){
        return this.http.post(`${apiUrl}tasks` , data)
    }

    getByProject(data : IGetTaskById ){
        return this.http.get(`${apiUrl}tasks/project/${data.projectId}`)
    }

    deleteGroup(data : IGetStat ){
        return this.http.delete(`${apiUrl}tasks/group/${data.id}`)
    }

    addItemToGroup(data : IAddNewItem){
        return this.http.post(`${apiUrl}tasks/item` , data)
    }

    getInfo(data : IGetTaskInfo){
        return this.http.post(`${apiUrl}tasks/info` , data)
    }

    changeGroup(data : IChangeGroup){
        return this.http.post(`${apiUrl}tasks/group` , data)
    }
}