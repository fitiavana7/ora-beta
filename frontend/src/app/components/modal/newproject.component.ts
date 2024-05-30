import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { ProjectService } from "src/app/services/project.service";
import { IProject } from "src/app/types/data";

@Component({
    selector : "app-new-project" , 
    templateUrl : "./newproject.component.html"
})
export class NewProjectComponent implements OnInit{

    public user  :any
    constructor(
        private projectService : ProjectService ,
        private userService : UserService
    ){}

    async ngOnInit() {
        const data = await this.userService.getData()
        if (data) {
            this.user = data
        }
    }

    public nom : string = ""
    public type : string = ""
    public description : string = ""

    setNewValue(e:Event , id  :string){
        switch (id) {
            case "nom":
                this.nom = (e.target as HTMLInputElement).value
                break;
            case "type":
                this.type = (e.target as HTMLSelectElement).value                
                break;        
            case "description":
                this.description = (e.target as HTMLTextAreaElement).value
                break;    
            default:
                break;
        }
    }
    @Output()
    public changeShowModal : EventEmitter<boolean> = new EventEmitter<boolean>()

    @Output()
    public SubmitNewProject : EventEmitter<IProject> = new EventEmitter<IProject>()


    @Input()
    public show : boolean = false

    public changerShow(){
        this.show = !this.show
        this.changeShowModal.emit(this.show)
    }

    
    public clickOutside(e:Event){
        e.stopPropagation()
    }

    handleSubmit(e:Event){
        e.preventDefault()
        const data :IProject = {
            ownerId : this.user.id,
            titre : this.nom , 
            type : this.type , 
            description : this.description 
        }
        this.SubmitNewProject.emit(data)
        this.show = false
    }
}