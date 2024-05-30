import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty() 
  userId: string;
  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  taskId: string;
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  projectId: string;
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  groupId: string;
  @IsString()
  @IsNotEmpty()
  taskTitle: string;
}
