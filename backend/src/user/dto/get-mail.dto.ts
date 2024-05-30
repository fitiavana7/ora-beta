import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class GetByMailDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    mail : string ;
}