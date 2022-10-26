import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    Post, 
    UsePipes, 
    ValidationPipe 
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { SeasonsService } from './seasons.service';
import { CreateSeasonDto, FindOneSeasonParam, SeasonDto } from './seasons.types';

@Controller('seasons')
export class SeasonsController {
    constructor(private readonly seasonsService: SeasonsService) {}

    @Get()
    async getSeasons(): Promise<SeasonDto[]> {
        const res = await this.seasonsService.findAll();
        if (res)
            return res;
        else
            throw new NotFoundException();
    }

    @Get(':id')
    @UsePipes(new ValidationPipe())
    async getOneSeason(@Param() params: FindOneSeasonParam): Promise<SeasonDto | object> {
        const res = await this.seasonsService.findOne(params.id);
        if (res)
            return res;
        else
            throw new NotFoundException();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createSeason(@Body() createSeasonDto: CreateSeasonDto): Promise<SeasonDto> {
        const res = await this.seasonsService.createSeason(createSeasonDto);
        if (res)
            return res;
        else
            throw new NotFoundException();
    }
}