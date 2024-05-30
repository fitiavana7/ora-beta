import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { Router } from "@angular/router";
import { apiUrl } from "src/app/constant/constant";
import { ProjectService } from "src/app/services/project.service";
import { TaskService } from "src/app/services/task.service";
import { IChangeGroup, IUpdateAssignee, IUpdateTitreOrDescri } from "src/app/types/data";
import { io } from "socket.io-client"
import { UserService } from "src/app/services/user.service";

@Component({
    selector : "app-task-modal" , 
    templateUrl : "./taskmodal.component.html"
})

export class TaskModalComponent implements OnInit {

    @Input()
    task : any = {}

    @Input()
    groupId : any = "" 

    @Output()
    public sendShowModal : EventEmitter<boolean> = new EventEmitter<boolean>()

    public socket : any ;
    public user : any
    public assigneeNom : string = ''

    constructor(
        private router : Router , 
        private projectService : ProjectService ,
        private taskService : TaskService ,
        private userService : UserService
    ){
        this.socket = io(apiUrl)
        this.currentTime='00:00:00'
    }

    public assigneeState : string = ''
    public groupState : string = ''
    public titreState : string = ''
    public descriState : string = ''
    public members : any = []
    public groups : any = []

    //donnée du track
    public totalTime : string = '00:00:00';
    public currentTime : string;
    public tracks : any = []
    public status : string = 'STOPPED'
    public isRunning : boolean = false
    public intervalId : any

    async ngOnInit(){
        const data = await this.userService.getData()
        if (data) {
            this.user = data
        }
        let tab = this.router.url.split("") 
        let id = tab.filter((e,index)=>index > 4).join("")
        this.projectService.getProjectMembers(id).subscribe({
            next : e => this.members = e,
            error : err => console.log(err)
        })
        this.taskService.getByProject({projectId : id}).subscribe({
            next : e => this.groups = e,
            error : err => console.log(err)
        })

        //recevoir le temps total
        this.socket.emit('get-task-total-time', {taskId : this.task._id})        
        this.socket.on(`task-total-time-${this.task._id}`, (data : any)=>{
            this.totalTime = data.total            
        })

        //recevoir les données du status du track
        this.socket.emit('get-task-status', {taskId : this.task._id})        
        this.socket.on(`task-status-${this.task._id}`, (data : any)=>{
            if(data){
                this.status = data.status            
                switch (data.status) {
                    case "START":
                        this.isRunning = true
                        break;
                    case "PLAY":
                        this.isRunning = true
                        break;
                    case "PAUSED":
                        this.isRunning = false
                        break;
                    case "STOPPED":
                        this.isRunning = false
                        break;
                    default:
                        break;
                }
                if (this.isRunning) {                
                    setInterval(()=>{
                        this.socket.emit('update-tracking-time-task', {taskId : this.task._id})
                        this.socket.on(`real-time-data-${this.task._id}`,(data:any)=>{
                            this.currentTime = data.time
                        })
                    },900)
                }else{
                    clearInterval(this.intervalId)
                }    
            }
        })

        //recevoir les données de tous les tracks precedents
        this.socket.emit('get-all-track-task', {taskId : this.task._id})
        this.socket.on(`all-track-task-${this.task._id}`, (data : any)=>{
            if (data) {
                this.tracks = data                
            }
        })

        if (this.task.assigneeId) {
            this.userService.getInfoById(this.task.assigneeId).subscribe({
                next : (e:any) => this.assigneeNom = e.username ,
                error : err => console.log(err)                
            })
        }

    }

    ngOndestroy():void{
        this.socket.off(`task-total-time-${this.task._id}`)
        this.socket.off(`all-track-task-${this.task._id}`)
        this.socket.off(`real-time-data-${this.task._id}`)
        this.socket.off(`tracking-setted-${this.task._id}`)
    }

    changeShowModal(){
        this.sendShowModal.emit(false)
    }

    clickInside(e:Event){
        e.stopPropagation()
    }

    changeState(e : Event , id : string){
        switch (id) {
            case "titre":
                this.titreState = (e.target as HTMLInputElement).value 
                if ( this.titreState.length > 1 && this.titreState !== this.task.titre) {
            
                    let tab = this.router.url.split("") 
                    let id = tab.filter((e,index)=>index > 4).join("")
                    const data : IUpdateTitreOrDescri = {
                        projectId : id , 
                        taskId : this.task._id ,
                        groupId : this.groupId ,
                        titre : this.titreState
                    }
                    this.socket.emit("update-task-titre" , data)
                }               
                break;
            case "description":
                this.descriState = (e.target as HTMLTextAreaElement).value 
                if ( this.descriState.length > 1 && this.descriState !== this.task.description) {
            
                    let tab = this.router.url.split("") 
                    let id = tab.filter((e,index)=>index > 4).join("")
                    const data : IUpdateTitreOrDescri = {
                        projectId : id , 
                        taskId : this.task._id ,
                        groupId : this.groupId ,
                        description : this.descriState
                    }
                    this.socket.emit("update-task-description" , data)
                }               
                break;
            case "assignee":
                this.assigneeState = (e.target as HTMLSelectElement).value 
                if ( this.assigneeState.length > 1 && this.assigneeState !== this.task.assigneeId) {
            
                    let tab = this.router.url.split("") 
                    let id = tab.filter((e,index)=>index > 4).join("")
                    const data : IUpdateAssignee = {
                        projectId : id , 
                        taskId : this.task._id ,
                        groupId : this.groupId ,
                        assigneeId : this.assigneeState
                    }
                    this.socket.emit("update-assignee" , data)
                    this.userService.getInfoById(this.assigneeState).subscribe({
                        next : (e:any) => this.assigneeNom = e.username ,
                        error : err => console.log(err)                
                    })
    
                }   
                break;
            case "group":
                this.groupState = (e.target as HTMLSelectElement).value
                if ( this.groupState.length > 1 && this.groupState !== this.groupId) {
            
                    let tab = this.router.url.split("") 
                    let id = tab.filter((e,index)=>index > 4).join("")
                    const data : IChangeGroup = {
                        projectId : id , 
                        taskId : this.task._id ,
                        groupId : this.groupId ,
                        newGroupId : this.groupState
                    }
                    this.socket.emit("task-change-group" , data)
                }
                break;        
            default:
                break;
        }
    }

    deleteTask(groupId : string , taskId : string){
        const data = { groupId , taskId}
        this.socket.emit('delete-task' , data)
        setTimeout(() => {
            this.sendShowModal.emit(false)            
        }, 500);
    }

    clickTimer(type : string){
        let tab = this.router.url.split("") 
        let id = tab.filter((e,index)=>index > 4).join("")
        const data = {
            projectId : id , 
            taskId : this.task._id ,
            groupId : this.groupId ,
            userId : this.user.id ,
            type ,
            taskTitle : this.task.titre
        }
        this.status = type
        this.socket.emit("set-tracking-task" , data)
        switch (this.status) {
            case "START" :
                this.isRunning = true
                break;
            case "PLAY" :
                this.isRunning = true
                break;
            case "PAUSED":
                this.isRunning = false
                break;
            case "STOPPED":
                this.isRunning = false
                break;
            default:
                break;
        }

        if (this.isRunning) {
            this.intervalId = setInterval(()=>{
                this.socket.emit('update-tracking-time-task', {taskId : this.task._id})
                this.socket.on(`real-time-data-${this.task._id}`,(data:any)=>{
                    this.currentTime = data.time                    
                })
            },900)
        }else{
            clearInterval(this.intervalId)
        }

        if (type !== 'START') {
            this.socket.on(`tracking-setted-${this.task._id}`, (data : any)=>{
                this.currentTime = this.convertirTemps(data.time)                
            })                
        }
    }

    updateDescription(e: Event , trackId : any){
        const data = {
            trackId ,
            description : (e.target as HTMLInputElement).value
        }
        this.socket.emit('update-description-tracking' , data)
    }

    convertirTemps(timestampDiff: number): string {
        const secondsInMinute = 60;
        const secondsInHour = 3600;
      
        const diffInSeconds = Math.floor(timestampDiff / 1000);
        
        const hours = Math.floor(diffInSeconds / secondsInHour);
        const minutes = Math.floor((diffInSeconds % secondsInHour) / secondsInMinute);
        const seconds = diffInSeconds % secondsInMinute;
      
        const formattedHours = ('0' + hours).slice(-2);
        const formattedMinutes = ('0' + minutes).slice(-2);
        const formattedSeconds = ('0' + seconds).slice(-2);
      
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      }

}