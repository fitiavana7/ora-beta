import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class GetUserByIdDto {

    @IsNotEmpty()
    @IsMongoId()
    userId : string ;
}