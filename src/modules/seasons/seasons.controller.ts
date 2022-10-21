import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    Post, 
    UsePipes, 
    ValidationPipe 
} from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { CreateSeasonDto, FindOneSeasonParam, SeasonDto } from './seasons.types';

@Controller('seasons')
export class SeasonsController {
    constructor(private readonly seasonsService: SeasonsService) {}

    @Get()
    getSeasons(): object {
        return this.seasonsService.findAll();
    }

    @Get(':id')
    @UsePipes(new ValidationPipe())
    async getOneSeason(@Param() params: FindOneSeasonParam): Promise<SeasonDto | object> {
        const res = await this.seasonsService.findOne(params.id);
        return res ? res : { message: "We couldn't find a season with that id!"}
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createSeason(@Body() createSeasonDto: CreateSeasonDto): Promise<SeasonDto> {
        return this.seasonsService.createSeason(createSeasonDto);
    }
}