import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonEntity } from '../../entities/season.entity';
import { SeasonsController } from './seasons.controller';
import { SeasonsProfile } from './seasons.profile';
import { SeasonsService } from './seasons.service';

@Module({
    imports: [TypeOrmModule.forFeature([SeasonEntity])],
    exports: [TypeOrmModule],
    providers: [SeasonsProfile, SeasonsService],
    controllers: [SeasonsController]
})

export class SeasonsModule {}