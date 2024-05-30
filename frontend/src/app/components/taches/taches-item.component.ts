import { Component, OnInit , Input, Output, EventEmitter } from "@angular/core";
import { apiUrl } from "src/app/constant/constant";
import { io } from "socket.io-client";

@Component({
    selector : "app-taches-item" , 
    templateUrl : "./taches-item.component.html"
})
export class TachesItemComponent implements OnInit{

    public socket : any
    constructor(
    ){
        this.socket = io(apiUrl)
    }

  
   //données du socket
   public status : string = 'STOPPED'
   public currentTime : string = ''

   public showTaskModal : boolean = false
   public selectedTask : any = {}

   @Input()
   task : any = {}

   @Input()
   groupId : any = {}

   @Output()
   public sendRefreshPage : EventEmitter<boolean> = new EventEmitter<boolean>()

   ngOnInit(): void {
    //recevoir le temps total
    this.socket.emit('get-task-total-time', {taskId : this.task._id})        
    this.socket.on(`task-total-time-${this.task._id}`, (data : any)=>{
        this.currentTime = data.total            
    })
   }

   ngOndestroy(){
    this.socket.off(`task-total-time-${this.task._id}`)
   }

   showModal(data : any){
    this.selectedTask = data
    this.showTaskModal = true    
   }

   receiveShowModal(data : boolean){
    this.sendRefreshPage.emit(true)
    this.showTaskModal = data
   }

}
