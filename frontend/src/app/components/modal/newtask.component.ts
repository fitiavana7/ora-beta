import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { TaskService } from "src/app/services/task.service";
import { IAddNewItem } from "src/app/types/data";

@Component({
    selector : "app-new-task" , 
    templateUrl : "./newtask.component.html"
})
export class NewTaskComponent {
    public nom : string = ""
    public description : string = ""

    constructor(
        private taskService  : TaskService ,
        private router : Router
    ){}

    setNewValue(e:Event , id  :string){
        switch (id) {
            case "nom":
                this.nom = (e.target as HTMLInputElement).value
                break;
            case "description":
                this.description = (e.target as HTMLTextAreaElement).value                
                break;        
            default:
                break;
        }
    }

    handleSubmit(e : Event){
        e.preventDefault()
        let tab = this.router.url.split("") 
        let projectId = tab.filter((e,index)=>index > 4).join("")
        const data : IAddNewItem = { 
            groupId : this.groupId , 
            titre : this.nom , 
            description : this.description ,
            projectId 
        }
        this.taskService.addItemToGroup(data).subscribe({
            next : e => {
                this.show = false
                this.changeShowModal.emit(this.show)
            },
            error : err => console.log(err)
        })
    }

    @Input()
    public show : boolean = false

    @Input()
    public groupId : string = ""

    @Output()
    public changeShowModal : EventEmitter<boolean> = new EventEmitter<boolean>()

    public changerShow(){
        this.show = !this.show
        this.nom = ''
        this.description = ""
        this.changeShowModal.emit(this.show)
    }

    public clickOutside(e:Event){
        e.stopPropagation()
    }
}