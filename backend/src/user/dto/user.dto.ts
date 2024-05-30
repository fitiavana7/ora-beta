import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3,50)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    mail : string ;

    @IsNotEmpty()
    @Length(6,100)
    @IsString()
    password : string
}