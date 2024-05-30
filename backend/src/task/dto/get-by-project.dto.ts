import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class GetTaskByProjectDto {

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    projectId : string
}