import { Component , OnInit} from "@angular/core";
import { ProjectService } from "src/app/services/project.service";
import { UserService } from "src/app/services/user.service";
import { IProject } from "src/app/types/data";

@Component({
    selector : "app-projects-list" , 
    templateUrl : "./projects.component.html"
})

export class ProjectsComponent implements OnInit {
    public showModal : boolean = false
    public projects : IProject[] = []
    public user : any 

    constructor(
        private projectService : ProjectService , 
        private userService : UserService
    ){
        this.getData()
    }

    async ngOnInit(){
        this.user = await this.userService.getData()         
        this.projectService.getProjectByUser(this.user.id).subscribe({
            next : (e:any) =>{
                this.projects = e as IProject[]
            },
            error : (err:any) => console.log(err)
        })
    }

    getData(){
        this.projectService.getAll().subscribe({
            next : e =>{
                this.projects = e as IProject[] 
            },
            error : err => console.log(err)
        })
    }

    changerModal(){
        this.showModal = !this.showModal;
    }

    receiveChangeShowNewProject(show : boolean){
        this.showModal = show
    }

    deleteProject(data : any){        
        this.projectService.deleteProject(data).subscribe({
            next : e => {
                this.getData()
            },
            error : err => console.log(err)
        })
    }

    receiveAddNewProject(data : IProject){
        this.projectService.create(data).subscribe({
            next : e => {
                this.getData()
            },
            error : err => console.log(err)
        })
    }
}