import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateProjectDto {

    @IsNotEmpty()
    @IsMongoId()
    ownerId : string ;

    @IsNotEmpty()
    @IsString()
    type : string

    @IsNotEmpty()
    @IsString()
    @Length(3,100)
    titre : string ;

    @IsOptional()
    @IsString()
    description : string

    @IsOptional()
    @IsString()
    membres : string

}