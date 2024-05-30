import { Component , OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChartType } from "ngx-apexcharts";
import { io } from "socket.io-client";
import { apiUrl } from "src/app/constant/constant";
import { ProjectService } from "src/app/services/project.service";
import { TrackService } from "src/app/services/track.service";

@Component({
    selector : "app-chart-page" , 
    templateUrl : "./chart-page.component.html"
})
export class ChartPageComponent implements OnInit{
    
    public socket : any
    public project : any

    public statData : any = []

    public series  : any[] = [{
        name : 'CHART' ,
        data : []
    }]
    public chart : ChartType = 'bar'

    public xaxis : any = {
        categories : []
    }
    
    constructor(
        private router : Router ,
        private projectService : ProjectService ,
        private trackService :TrackService
        ){
        this.socket = io(apiUrl)
    }

    ngOnInit(): void {
        console.log('iciii');
        
        let tab = this.router.url.split("") 
        let id = tab.filter((e,index)=>index > 4).join("")
        this.projectService.getById(id).subscribe({
            next : e => this.project = e,
            error : err => console.log(err)
        })
        this.trackService.getStat({id}).subscribe({
            next : (e:any) => {
                e.map((el: any) => {
                    this.series[0].data = [...this.series[0].data , el.totalTimer]
                    this.xaxis.categories = [...this.xaxis.categories , el.title]
                })
            },
            error : err => console.log(err)
        })
    }
}