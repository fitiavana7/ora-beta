import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { io } from "socket.io-client";
import { apiUrl } from "src/app/constant/constant";
import { ProjectService } from "src/app/services/project.service";
import { TaskService } from "src/app/services/task.service";
import { IAddNewGroup } from "src/app/types/data";

@Component({
    selector : "app-taches" , 
    templateUrl : "./taches.component.html"
})
export class TachesComponent implements OnInit{
    public showAddTask : boolean = false
    public showTaskDetail : boolean = false
    public ShowAddNewGroup : boolean = false
    public titreGroup : string = ""
    public tasks : any = []
    public groupId : string = ""
    public modalGroupId : string = ""
    public projectId : string = ""
    public project : any = {}
    public socket : any
    constructor(
        private router : Router ,
        private taskService  : TaskService ,
        private projectService : ProjectService  
    ){
        let tab = this.router.url.split("") 
        this.projectId = tab.filter((e,index)=>index > 4).join("")
        this.socket = io(apiUrl)
    }
    
    ngOnInit(): void {
        this.getTasksData()
        this.projectService.getById(this.projectId).subscribe({
            next : e => this.project = e,
            error : err => console.log(err)
        })
    }

    deleteGroup(groupId : string){
        this.taskService.deleteGroup({id : groupId}).subscribe({
            next : e => this.getTasksData() ,
            error : err => console.log(err)            
        })
    }

    getTasksData(){
        this.socket.off('get-project-tasks')
        this.socket.off(`project-tasks-${this.projectId}`)
        this.socket.emit('get-project-tasks' , { projectId : this.projectId})
        this.socket.on(`project-tasks-${this.projectId}`, (data : any)=>{
            this.tasks = data
        })
    }

    setNewValue(e : Event){
        this.titreGroup = (e.target as HTMLInputElement).value.toLocaleUpperCase()   
    }

    receiveChangeShowAddTask(show : boolean){
        this.showAddTask = show
        this.getTasksData()
    }

    receiveRefreshPage(show : boolean){
        this.getTasksData()
    }

    handleSubmit(e : Event){
        e.preventDefault()
        let tab = this.router.url.split("") 
        let id = tab.filter((e,index)=>index > 4).join("")
        const data : IAddNewGroup ={titre : this.titreGroup , projectId : id}
        this.taskService.createGroup(data).subscribe({
            next : e=> {
                this.ShowAddNewGroup = false
                this.titreGroup = ""
                this.getTasksData()
            },
            error : err => console.log(err)
        })
    }

    changeShowAddNewGroup () {
        this.ShowAddNewGroup = !this.ShowAddNewGroup
    }

    changeShowAddTask(id : string){
        this.showAddTask = !this.showAddTask 
        this.groupId = id
    }


    receiveChangeShowTaskDetail(show : boolean){
        this.showTaskDetail = show 
        
    }

    changeShowTaskDetail(){
        this.showTaskDetail = !this.showTaskDetail 
    }
}
