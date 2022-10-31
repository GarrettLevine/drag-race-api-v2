import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { SeasonEntity } from 'src/entities/season.entity';
import { CreateSeasonDto, SeasonDto } from './seasons.types';
import { ApiLogger } from 'src/utils/logger';

@Injectable()
export class SeasonsService {
    private readonly logger = new ApiLogger(SeasonsService.name);

    constructor(
        @InjectRepository(SeasonEntity)
        private seasonsRepository: Repository<SeasonEntity>,
        @InjectMapper() private readonly classMapper: Mapper,
    ) { }

    async findAll(): Promise<SeasonDto[]> {
        try {
            this.logger.log('Finding seasons...');
            return this.classMapper.mapArrayAsync(await this.seasonsRepository.find(), SeasonEntity, SeasonDto);
        } catch {
            this.logger.error('Could not find seasons');
            throw new InternalServerErrorException();
        }
    }

    async findOne(id: number): Promise<SeasonDto> {
        try {
            this.logger.log(`Finding season of id=[${id}]...`);
            return this.classMapper.mapAsync(await this.seasonsRepository.findOne({  where: { id }}), SeasonEntity, SeasonDto)
        } catch {
            this.logger.error(`Could not find season with id:[${id}]`);
            throw new InternalServerErrorException();
        }
    }

    async createSeason(createSeasonDto: CreateSeasonDto): Promise<SeasonDto> {
        try {
            this.logger.log('Creating season...');
            return this.classMapper.mapAsync(await this.seasonsRepository.save(createSeasonDto), SeasonEntity, SeasonDto);
        } catch {
            this.logger.error('Could not create new season');
            throw new InternalServerErrorException();
        }
    }
}