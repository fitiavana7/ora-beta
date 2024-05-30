import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class TaskItemDto {

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    groupId : string

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    projectId : string

    @IsString()
    @IsNotEmpty()
    titre : string    

    @IsString()
    @IsNotEmpty()
    description : string
}