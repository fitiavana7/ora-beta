import { Body, Controller, Get, Post } from '@nestjs/common';
import { FindOneTrackDto } from './dto/find-one-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {

    constructor(
        private trackService : TrackService
    ){}

   @Post()
   receiveData(@Body() data : any){
 
   }
    @Post('project-stat')
    getStatData(@Body() data : FindOneTrackDto){
        return this.trackService.getStat(data)
    }
}
