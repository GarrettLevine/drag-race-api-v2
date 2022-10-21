import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { Season } from 'src/entities/season.entity';

@Controller('seasons')
export class SeasonsController {
    constructor(private readonly seasonsService: SeasonsService) {}

    @Get()
    getSeasons(): object {
        return this.seasonsService.findAll();
    }

    @Get(':id')
    getOneSeason(@Param('id') id: number): object {
        return this.seasonsService.findOne(id);
    }

    @Post()
    createSeason(@Body() newSeason: Season): object {
        return this.seasonsService.createSeason(newSeason);
    }
}