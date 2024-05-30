import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
import { TrackService } from 'src/track/track.service';
  
  @WebSocketGateway({ cors: "http://localhost:4200" })
  class TrackGateway {
    @WebSocketServer()
    public server : Server;
   
    public constructor(
      private trackService : TrackService
    ) {}
   
    @SubscribeMessage('set-tracking-task') 
    async handleReceiveData(@MessageBody() data) {
      const { projectId , userId , type , groupId , taskId } = data
      let result ;
      switch(type){ 
        case "START" :  
            await this.trackService.create({taskTitle : data.taskTitle , projectId , groupId , userId , taskId})
          break;
        case "PAUSED" : 
          result = await this.trackService.updateTimerTask({taskId , userId ,timer: Date.now(),type});
          break; 
        case "PLAY" : 
        result = await this.trackService.updateTimerTask({taskId, userId ,timer: Date.now(),type});
          break;
        case "STOPPED" :
          result = await this.trackService.updateTimerTask({taskId, userId ,timer: Date.now(),type});
          
          //envoie des nouveaux listes de track
          let res = await this.trackService.findByTaskId({id : taskId})
          this.server.emit('all-track-task-' + taskId, res);    
          
          //envoie du total temps
          let result1 = await this.trackService.getTaskStatus({id :taskId})
          if (result1 && result1.status == "STOPPED") {
            const result = await this.trackService.getTotalTime({id:taskId})
            this.server.emit('task-total-time-' + taskId, result);
          }  
          break;
        default:
          break;
      }
      this.server.emit('tracking-setted-' + taskId, result);
    }

    @SubscribeMessage('update-description-tracking')
    async handleUpdateTrackDescription(@MessageBody() data) {
      const { trackId , description } = data
      await this.trackService.updateTrackDescription({trackId ,description})
    }   

    @SubscribeMessage('get-task-status')
    async handleGetTaskStatus(@MessageBody() data) {
      const {taskId} = data      
      let result = await this.trackService.getTaskStatus({id :taskId})
      this.server.emit('task-status-' + taskId, result);
    } 
          
    @SubscribeMessage('get-task-total-time')  
    async handleGetTaskTotalDuration(@MessageBody() data) { 
      const {taskId} = data
      let result = await this.trackService.getTaskStatus({id :taskId})
      if (result && result.status == "STOPPED") {
        const result = await this.trackService.getTotalTime({id:taskId})
        this.server.emit('task-total-time-' + taskId, result);
      }  
    }     
        
    @SubscribeMessage('get-all-track-task')
    async setTracking(@MessageBody() data) {
      const {taskId} = data
      let result = await this.trackService.findByTaskId({id : taskId})
      this.server.emit('all-track-task-' + taskId, result);
    } 
    
    @SubscribeMessage('update-tracking-time-task')
    async handleUpdateRealTime(@MessageBody() data) {
      const { taskId } = data
      let result = await this.trackService.updateRealTimeTask({taskId , timer : Date.now()})
      this.server.emit('real-time-data-'+ taskId, result);
    } 
  
  } 
  
  export default TrackGateway; 
    