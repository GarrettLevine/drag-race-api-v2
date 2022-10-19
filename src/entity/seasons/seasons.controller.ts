import { Controller, Get } from '@nestjs/common';
import { SeasonsService } from './seasons.service';

@Controller()
export class SeasonsController {
    constructor(private readonly seasonsService: SeasonsService) {}

    @Get()
    getSeasons(): object {
        return this.seasonsService.findAll();
    }
}