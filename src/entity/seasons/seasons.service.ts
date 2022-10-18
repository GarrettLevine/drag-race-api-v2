import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Season } from './season.entity';

@Injectable()
export class SeasonsService {
    constructor(
        @InjectRepository(Season)
        private seasonsRepository: Repository<Season>
    ) {}

    findAll(): Promise<Season[]> {
        return this.seasonsRepository.find();
    }
}