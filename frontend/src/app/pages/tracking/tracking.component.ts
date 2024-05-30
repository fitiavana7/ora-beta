import { Component } from "@angular/core";

@Component({
    selector : "app-tracking" , 
    templateUrl : "./tracking.component.html"
})
export class TrackingComponent{
    public page : string = "TACHES" ;
    public activeLink : string = 'w-full mb-2 border border-red-500 text-red-500 font-bold p-2 rounded-md'
    public inActiveLink : string = 'w-full mb-2 text-red-500 font-bold p-2 rounded-md'

    changePage(data : string){
        this.page = data
    }

}