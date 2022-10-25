import { SeasonEntity } from 'src/entities/season.entity';
import { CreateSeasonDto, SeasonDto } from './seasons.types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

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
        } catch (err) {
            throw new Error(`findAll failed: ${err.message}`);
        }
    }

    async findOne(id: number): Promise<SeasonDto> {
        try {
            return this.classMapper.mapAsync(await this.seasonsRepository.findOne({  where: { id }}), SeasonEntity, SeasonDto)
        } catch (err) {
            throw new Error(`findOne failed: ${err.message}`);
        }
    }

    async createSeason(createSeasonDto: CreateSeasonDto): Promise<SeasonDto> {
        try {
            return this.classMapper.mapAsync(await this.seasonsRepository.save(createSeasonDto), SeasonEntity, SeasonDto);
        } catch (err) {
            throw new Error(`create failed: ${err.message}`);
        }
    }
}