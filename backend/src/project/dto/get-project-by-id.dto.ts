import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class GetProjectByIdDto {
    @IsNotEmpty()
    @IsMongoId()
    id : string ;
}