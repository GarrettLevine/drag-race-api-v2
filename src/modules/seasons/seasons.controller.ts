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
        if (!res)
            throw new NotFoundException('no seasons found');

        return res;
    }

    @Get(':id')
    @UsePipes(new ValidationPipe())
    async getOneSeason(@Param() params: FindOneSeasonParam): Promise<SeasonDto | object> {
        const res = await this.seasonsService.findOne(params.id);
        if (!res)
            throw new NotFoundException(`no season with id=[${params.id}]`);

        return res;
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createSeason(@Body() createSeasonDto: CreateSeasonDto): Promise<SeasonDto> {
        const res = await this.seasonsService.createSeason(createSeasonDto);
        return res;
    }
}