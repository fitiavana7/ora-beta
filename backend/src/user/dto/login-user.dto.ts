import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    mail : string ;

    @IsNotEmpty()
    @Length(6,100)
    @IsString()
    password : string
}