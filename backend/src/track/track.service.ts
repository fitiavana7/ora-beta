import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { TaskService } from 'src/task/task.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { FindOneTrackDto } from './dto/find-one-track.dto';
import { Track, TrackDocument } from './schema/track.schema';

@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Track.name) 
        private readonly trackModel: Model<TrackDocument>,
        private taskService : TaskService
    ){}

    create(createTrackDto: CreateTrackDto) {
        const tracking = new this.trackModel(createTrackDto);
        tracking.timer = Date.now()
        tracking.save();
        return tracking;
    }

    async getTrack(data : {taskId : string }){
      const {taskId} = data
      return await this.trackModel.findOne({taskId})        
    }

    async getStat(data : FindOneTrackDto){
      const { id} = data
      let tracks = await this.trackModel.find({projectId : id})
      tracks = tracks.filter(track =>track.step_timers.length > 0 && track.step_timers[track.step_timers.length-1].type === 'STOPPED')       
      const taskMap : any = {}
      tracks.forEach(task => {
        const key = `${task.taskId}`
        if (key in taskMap) {
          taskMap[key] += task.timer
        }else{
          taskMap[key]= task.timer
        }
      })

      const result = Object.keys(taskMap)
      let res : any = []
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        const taskId = element
        const track : any = await this.getTrack({taskId})
        
        res = [...res , { 
          taskId , 
          projectId : id ,
          title : `${track.taskTitle} , ${this.convertirTemps(taskMap[element])}`,
          totalTimer : this.convertirTempsEnMinute(taskMap[element]) , 
          timestring : this.convertirTemps(taskMap[element]) ,
        }]
      }
      return res
    }

    async updateTimerTask(data :{taskId: string, userId : string, timer: number , type: string} ): Promise<any> {
        let {taskId , userId , timer , type} = data
        const tasks = await this.trackModel.find({ taskId});
        if (!tasks.length) return;
        const task = tasks[tasks.length-1]
        const TASK: any = task;
        if (TASK.updatedAt.toDateString() == new Date().toDateString()) {
          if(type=="PAUSED" || type =="STOPPED"){ 
            if(task.step_timers.length == 0){
              timer = timer - task.timer 
            } else{
              timer = task.timer + timer - task.step_timers[task.step_timers.length-1].timestamp
            }
          }
          if(type=="PLAY"){ 
            timer = task.timer
          }
          const timerSteps = task.step_timers;
          timerSteps.push({ timer, type, timestamp: Date.now() });
          task.step_timers = timerSteps;
          await this.trackModel.updateOne(
            { _id : task._id },
            {  
              timer,
              step_timers: timerSteps 
            },
          );
          return { taskId, time : timer};
        } else {
          const timerSteps = [];
          timerSteps.push({ timer, timestamp: Date.now() });
          const newTask: any = [];
          newTask.taskId = task.taskId;
          newTask.userId = task.userId;
          newTask.timer = timer;
          newTask.timerSteps = timerSteps;
          newTask.projectId = task.projectId;
          const createdTask = new this.trackModel(newTask);
          return await createdTask.save();
        }
      }

      async getTaskStatus(data : FindOneTrackDto){
        let taskId = data.id
        const tasks = await this.trackModel.find({ taskId});
        
        if (!tasks.length) return;
        const task = tasks[tasks.length-1] 
        if (task.step_timers.length < 1) {
          return { taskId , owner : task.userId , status : "START" }
        } else{
          const status = task.step_timers[task.step_timers.length - 1].type 
          return {taskId , owner : task.userId , status }
        }   
      }

      async findByTaskId(task: FindOneTrackDto) {
        const result = await this.trackModel.find({
          taskId: task.id,
        });
        return result.filter(e => e.step_timers.length > 0 && e.step_timers[e.step_timers.length -1].type === 'STOPPED')
      }

      findByUser(track: FindOneTrackDto) {
        return this.trackModel.find({
          userId: track.id,
        });
      }

      async stopOthersTask(data : {userId : string}){
        const {userId} = data
        let tasks = await this.findByUser({id : userId})
        if (tasks.length) {
          tasks.map((task)=>{
            const { userId , taskId , step_timers } = task
            if (step_timers.length !== 0) {
              const type = step_timers[step_timers.length -1].type
              if (type !== "STOPPED" && type !== "PAUSED") {
                this.updateTimerTask({taskId , userId , timer: Date.now() , type : "STOPPED"})            
              }
              if(type === "PAUSED"){
                const result = step_timers[step_timers.length-1].timer
                this.stopPausedTrack({taskId , userId , timer : parseInt(result) , type : "STOPPED"})            
              } 
            } else {
              this.updateTimerTask({taskId , userId , timer: Date.now() , type : "STOPPED"})            
            }
          })
        }
      }  

      async stopPausedTrack(data :{taskId: string, userId : string, timer: number , type: string} ){
        let {taskId , userId , timer , type} = data
        const tasks = await this.trackModel.find({ taskId});
        if (!tasks.length) return;
        const task = tasks[tasks.length-1]
        const TASK: any = task;
        if (TASK.updatedAt.toDateString() == new Date().toDateString()) {
          const timerSteps = task.step_timers;
          timerSteps.push({ timer, type, timestamp: Date.now() });
          task.step_timers = timerSteps;  
          await this.trackModel.updateOne(
            { _id : task._id },
            {  
              timer,
              step_timers: timerSteps 
            },
          );
        } 
      }

      async updateTrackDescription(data : {trackId :string , description : string}){
        const {trackId , description} = data
        await this.trackModel.updateOne(
          { _id : trackId },
          {  
            description,
          },
        );
      }    
      
  
      async getTotalTime(data : FindOneTrackDto){
        let taskId = data.id
        const tasks = await this.trackModel.find({taskId});
        if (tasks.length == 0) return;
        let total : number = 0;
        tasks.map((el)=>{
          if(el.step_timers[el.step_timers.length-1].type === "STOPPED"){
            total += el.timer
          } 
        })
        return {taskId , total : this.convertirTemps(total)}
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

      convertirTempsEnMinute(time : number){
        return Math.floor(time / 60000)
      }

      async updateRealTimeTask(data :{taskId: string, timer: number } ):Promise<any>{
        let {taskId ,timer} = data
        const tasks = await this.trackModel.find({ taskId});
        if (!tasks.length) return;
        const task = tasks[tasks.length-1]
        const TASK: any = task;
        if (TASK.updatedAt.toDateString() == new Date().toDateString()) {
            if(task.step_timers.length == 0){
              timer = timer - task.timer 
            } else{
              timer = task.timer + timer - task.step_timers[task.step_timers.length-1].timestamp
            }
          return {time : this.convertirTemps(timer)};
        }
      }

} 
