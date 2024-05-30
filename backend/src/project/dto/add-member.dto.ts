import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class AddMemberDto {

    @IsNotEmpty()
    @IsEmail()
    mail : string

    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    projectId : string

}