import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class VerifyTokenDto {
    @IsNotEmpty()
    @IsString()
    token : string ;
}