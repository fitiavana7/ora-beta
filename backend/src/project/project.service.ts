import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { AddMemberDto } from './dto/add-member.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectByIdDto } from './dto/get-project-by-id.dto';
import { Project, ProjectDocument } from './schema/project.schema';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name) 
        private readonly projectModel: Model<ProjectDocument>,
        @InjectModel(User.name) 
        private readonly userModel: Model<UserDocument>
    ){}

    async getAllProjects(){
        return await this.projectModel.find({});
    }

    async getById(data : GetProjectByIdDto){        
        const found = await this.projectModel.findOne({ _id : data.id})
        if(!found){
            throw new BadRequestException("Project not found")
        }
        return found
    }

    async getByUser(data : GetProjectByIdDto){        
        const found = await this.projectModel.find({
            $or : [
                { ownerId  : data.id} ,
                { 'membres._id' : data.id }
            ]
        })
        if(!found){
            throw new BadRequestException("No projects")
        }
        return found
    }

    async create(data : CreateProjectDto){
        return this.projectModel.create(data)
    }

    async deleteProject(data : GetProjectByIdDto){
        return this.projectModel.deleteOne({_id : data.id})
    }

    async getProjectMembers(data : GetProjectByIdDto){
        const {id} = data
        const project = await this.projectModel.findOne({_id : id})
        let res = []
        const ownerData = await this.userModel.findOne({_id : project.ownerId})
        res = [ownerData]
        project.membres.map(e=> res.push(e))        
        return res
    }

    async addMember(data : AddMemberDto){
        const {projectId , mail} = data

        const user = await this.userModel.findOne({mail})

        if(!user){throw new BadRequestException("User not found")}

        const project = await this.projectModel.findOne({_id : projectId})

        if(!project){throw new BadRequestException("Project not found")}

        let membresProjects = project.membres;
        membresProjects.push(user);
        project.membres = membresProjects;  
        return await this.projectModel.updateOne(
          { _id : project._id },
          {  
            membres : membresProjects
          },
        );

    }

}
