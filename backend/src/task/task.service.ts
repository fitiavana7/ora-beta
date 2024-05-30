import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { GetByIdDto } from './dto/get-by-id.dto';
import { GetTaskByProjectDto } from './dto/get-by-project.dto';
import { updateAssigneeDto } from './dto/update-assignee.dto';
import { TaskItemDto } from './dto/task-item.dto';
import { Task, TaskDocument } from './schema/task.schema';
import { changeGroupDto } from './dto/change-group.dto';
import { UpdateTaskTitreDto } from './dto/update-task-titre.dto';
import { UpdateTaskDescriDto } from './dto/update-task-description';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) 
        private readonly taskModel: Model<TaskDocument>,
    ){}

    async getByProject(data : GetTaskByProjectDto ){
        return await this.taskModel.find({projectId : data.projectId});
    }

    async deleteTask(data : { groupId : string , taskId : string }){
      const result = await this.taskModel.findOne({ _id : data.groupId})
      let taskLists = result.tasks;
      taskLists = taskLists.filter((item:any)=>{
        if (!item._id.equals(new ObjectId(data.taskId))) {
          return item
        }
      })      
      result.tasks = taskLists;                  
      return await this.taskModel.updateOne(
        { _id : data.groupId},
        {  
          tasks : taskLists
        },
      );      
    }

    async getByTaskId(data : {taskId : string}){
      return await this.taskModel.find({ta : data.taskId});
    }

    async deleteGroup(data : {id : string}){
      return await this.taskModel.deleteOne({_id : data.id})
    }

    async getById(data : GetByIdDto ){
        const { projectId , taskId , groupId} = data
        const res = await this.taskModel.find({projectId});
        const result = res.filter(e => e._id.equals(new ObjectId(groupId)))
        return result[0].tasks.filter(e => e._id.equals(new ObjectId(taskId)))[0]
    }

    async createGroup(data : CreateGroupDto){
        return await this.taskModel.create(data)
    }

    async updateAssignee(data : updateAssigneeDto){
        const { projectId , taskId , groupId , assigneeId} = data
        const task = await this.taskModel.findOne({projectId , _id : groupId});
        let tasksLists = task.tasks
        tasksLists.map(e => {
            if (e._id.equals(new ObjectId(taskId))) {
                e.assigneeId = assigneeId
            }
        })
        await this.taskModel.updateOne(
            { _id : groupId , projectId},
            {  
              tasks : tasksLists
            },
          );
        
    }

    async updateTaskTitre(data : UpdateTaskTitreDto){
        const { projectId , taskId , groupId , titre} = data
        const task = await this.taskModel.findOne({projectId , _id : groupId});
        let tasksLists = task.tasks
        tasksLists.map(e => {
            if (e._id.equals(new ObjectId(taskId))) {
                e.titre = titre
            }
        })
        await this.taskModel.updateOne(
            { _id : groupId , projectId},
            {  
              tasks : tasksLists
            },
          );    
        }

    async updateTaskDescri(data : UpdateTaskDescriDto){
        const { projectId , taskId , groupId , description} = data
        const task = await this.taskModel.findOne({projectId , _id : groupId});
        let tasksLists = task.tasks
        tasksLists.map(e => {
            if (e._id.equals(new ObjectId(taskId))) {
                e.description = description
            }
        })
        await this.taskModel.updateOne(
            { _id : groupId , projectId},
            {  
              tasks : tasksLists
            },
          );    
    }

    async changeGroup(data : changeGroupDto){
        const { projectId , taskId , groupId , newGroupId} = data
        const currentGroup = await this.taskModel.findOne({_id : groupId , projectId})
        const newGroup = await this.taskModel.findOne({_id : newGroupId , projectId})
        let currentTasks = currentGroup.tasks;
        let newTasks = newGroup.tasks;

        let task = currentTasks.find(e => e._id.equals(new ObjectId(taskId)))
        currentTasks = currentTasks.filter(e => !e._id.equals(new ObjectId(taskId)))
        newTasks = [...newTasks , task]

        await this.taskModel.updateOne(
            { _id : currentGroup._id , projectId},
            {  
              tasks : currentTasks
            },
          );
        await this.taskModel.updateOne(
            { _id : newGroup._id , projectId},
            {  
              tasks : newTasks
            },
          );
    }

    async AddItemToGroup(data : TaskItemDto){
        const {groupId , titre , description , projectId} = data
        const task = await this.taskModel.findOne({_id : groupId , projectId})
        let taskLists = task.tasks;
        taskLists.push({titre , description});
        task.tasks = taskLists;                  
        return await this.taskModel.updateOne(
          { _id : task._id , projectId},
          {  
            tasks : taskLists
          },
        );
    }
}
