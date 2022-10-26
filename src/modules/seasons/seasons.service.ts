import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { SeasonEntity } from 'src/entities/season.entity';
import { CreateSeasonDto, SeasonDto } from './seasons.types';

@Injectable()
export class SeasonsService {
    constructor(
        @InjectRepository(SeasonEntity)
        private seasonsRepository: Repository<SeasonEntity>,
        @InjectMapper() private readonly classMapper: Mapper,
    ) { }

    async findAll(): Promise<SeasonDto[]> {
        try {
            return this.classMapper.mapArrayAsync(await this.seasonsRepository.find(), SeasonEntity, SeasonDto);
        } catch {
            throw new InternalServerErrorException('could not retrieve seasons');
        }
    }

    async findOne(id: number): Promise<SeasonDto> {
        try {
            return this.classMapper.mapAsync(await this.seasonsRepository.findOne({  where: { id }}), SeasonEntity, SeasonDto)
        } catch {
            throw new InternalServerErrorException(`could not retrieve season of id=[${id}]`);
        }
    }

    async createSeason(createSeasonDto: CreateSeasonDto): Promise<SeasonDto> {
        try {
            return this.classMapper.mapAsync(await this.seasonsRepository.save(createSeasonDto), SeasonEntity, SeasonDto);
        } catch {
            throw new InternalServerErrorException('could not create season');
        }
    }
}