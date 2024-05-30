import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class updateAssigneeDto {

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    taskId : string

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    projectId : string

    
    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    groupId : string

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    assigneeId : string
}