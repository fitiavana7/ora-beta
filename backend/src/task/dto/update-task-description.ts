import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UpdateTaskDescriDto {

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
    taskId : string

    @IsString()
    @IsNotEmpty()
    @Length(2,100)
    description : string
}