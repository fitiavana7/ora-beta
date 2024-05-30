import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { AddMemberDto } from './dto/add-member.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectByIdDto } from './dto/get-project-by-id.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {

    constructor(
        private projectService : ProjectService
    ){}

    @Get()
    getProject(){
        return this.projectService.getAllProjects()
    }

    @Post()
    create(@Body() data : CreateProjectDto){        
        return this.projectService.create(data)
    }
 
    @Get("/user/:id")
    getProjectByUser(@Param() data : GetProjectByIdDto ){
        return this.projectService.getByUser(data)
    }

    @Get("/:id")
    getProjectById(@Param() data : GetProjectByIdDto ){
        return this.projectService.getById(data)
    }

    @Delete("/:id")
    deleteProject(@Param() data : GetProjectByIdDto ){
        return this.projectService.deleteProject(data)
    }


    @Post("/members")
    addMembres(@Body() data : AddMemberDto){
        return this.projectService.addMember(data)
    }

    @Get("/members/:id")
    getMembers(@Param() data){        
        return this.projectService.getProjectMembers(data)
    }
}
