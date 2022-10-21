import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeasonEntity } from 'src/entities/season.entity';
import { Repository } from 'typeorm';
import { CreateSeasonDto, SeasonDto } from './seasons.types';

@Injectable()
export class SeasonsService {
    constructor(
        @InjectRepository(SeasonEntity)
        private seasonsRepository: Repository<SeasonEntity>
    ) {}

    findAll(): Promise<SeasonDto[]> {
        return this.seasonsRepository.find();
    }

    findOne(id: number): Promise<SeasonEntity | object> {
        return this.seasonsRepository.findOne({ where: { id }});
    }

    async createSeason(createSeasonDto: CreateSeasonDto): Promise<SeasonEntity> {
        const result = await this.seasonsRepository.save(createSeasonDto);
        return result;
    }
}