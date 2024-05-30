import { Controller, Body, Get , Post, Param, Delete} from '@nestjs/common';
import { changeGroupDto } from './dto/change-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { GetByIdDto } from './dto/get-by-id.dto';
import { GetTaskByProjectDto } from './dto/get-by-project.dto';
import { TaskItemDto } from './dto/task-item.dto';
import { updateAssigneeDto } from './dto/update-assignee.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {

    constructor(
        private taskService : TaskService
    ){}

    @Get("project/:projectId")
    getTasks(@Param() data : GetTaskByProjectDto){
        return this.taskService.getByProject(data)
    }

    @Post()
    create(@Body() data  : CreateGroupDto){
        return this.taskService.createGroup(data)
    }

    @Post("info")
    getInfo(@Body() data : GetByIdDto){
        return this.taskService.getById(data)
    }

    @Delete('group/:id')
    deleteGroup(@Param() data : {id : string}){
        return this.taskService.deleteGroup(data)
    }

    @Post("item")
    AddNewItem(@Body() data  : TaskItemDto){
        return this.taskService.AddItemToGroup(data)
    }

    @Post("assignee")
    addAssignee(@Body() data : updateAssigneeDto){
        return this.taskService.updateAssignee(data)
    }

    @Post("group")
    changeGroup(@Body() data : changeGroupDto){
        return this.taskService.changeGroup(data)
    }

}
