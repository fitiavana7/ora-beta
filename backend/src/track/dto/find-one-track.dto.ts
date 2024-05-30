import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindOneTrackDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  id: string;
}
