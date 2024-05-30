import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { TaskService } from 'src/task/task.service';

@WebSocketGateway({ cors: "http://localhost:4200" })
class TaskGateway {
  @WebSocketServer()
  public server : Server;

  public constructor(
    private taskService : TaskService
  ) {}
 
  @SubscribeMessage('get-project-tasks')
  async handleGetAllTrack(@MessageBody() data) {
    const result = await this.taskService.getByProject(data)
    this.server.emit('project-tasks-' + data.projectId, result);

  }  

  @SubscribeMessage('delete-task')
  async handleDeleteTask(@MessageBody() data) {
    const result = await this.taskService.deleteTask(data)
    
  }  

  @SubscribeMessage("task-change-group")
  async changeGroup(@MessageBody() data){
    this.taskService.changeGroup(data)
  }
 
  @SubscribeMessage("update-assignee")
  async updateAssignee(@MessageBody() data){
    this.taskService.updateAssignee(data)
  }

  @SubscribeMessage("update-task-titre")
  async updatetitre(@MessageBody() data){
    this.taskService.updateTaskTitre(data)
  }

  @SubscribeMessage("update-task-description")
  async updateDescri(@MessageBody() data){
    this.taskService.updateTaskDescri(data)
  }

} 

export default TaskGateway; 
  