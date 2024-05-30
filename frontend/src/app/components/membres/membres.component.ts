import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { ProjectService } from "src/app/services/project.service"
import { IAddMember } from "src/app/types/data"

@Component({
    selector : "app-membres" , 
    templateUrl : "./membres.component.html"
})
export class MembresComponent implements OnInit{
    public showAddMembers : boolean = false
    public mail : string = ""
    public members : any = []
    public hasAddError : boolean = false

    constructor(
        private router : Router ,
        private projectService  : ProjectService 
    ){}

    ngOnInit(): void {
        this.getMembers()
    }

    getMembers(){
        let tab = this.router.url.split("") 
        let id = tab.filter((e,index)=>index > 4).join("")
        this.projectService.getProjectMembers(id).subscribe({
            next : e => this.members = e,
            error : err => console.log(err)
        })
    }

    setNewValue(e : Event){
        this.hasAddError = false
        this.mail = (e.target as HTMLInputElement).value    
    }

    handleSubmit(e : Event){
        e.preventDefault()
        let tab = this.router.url.split("") 
        let url = tab.filter((e,index)=>index > 4).join("")
        const data : IAddMember = {mail : this.mail , projectId : url}
        this.projectService.addMember(data).subscribe({
            next : e => {
                this.showAddMembers = false
                this.hasAddError = false
                this.getMembers()
            },
            error : err => {
                console.log(err)
                this.hasAddError = true
            }
        })
    }

    changeShowAddMembers () {
        this.showAddMembers = !this.showAddMembers
    }
} 