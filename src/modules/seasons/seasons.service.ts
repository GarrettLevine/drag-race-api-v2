import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Season } from '../../entities/season.entity';

@Injectable()
export class SeasonsService {
    constructor(
        @InjectRepository(Season)
        private seasonsRepository: Repository<Season>
    ) {}

    findAll(): Promise<Season[]> {
        return this.seasonsRepository.find();
    }

    findOne(id: number): Promise<Season> {
        return this.seasonsRepository.findOne({ where: { id }});
    }

    async createSeason(newSeason: Season): Promise<Season> {
        const result = await this.seasonsRepository.save(newSeason);
        return result;
    }
}