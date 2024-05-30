import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { IAddNewGroup, IGetStat} from "../types/data";
import { apiUrl } from "../constant/constant";

@Injectable()
export class TrackService {

    constructor(
        private http : HttpClient
    ){}

    getStat(data  : IGetStat){
        return this.http.post(`${apiUrl}track/project-stat` , data)
    }
}