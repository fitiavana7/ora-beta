import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateGroupDto {

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    projectId : string

    @IsString()
    @IsNotEmpty()
    @Length(2,100)
    titre : string
}