import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonEntity } from '../../entities/season.entity';
import { SeasonsController } from './seasons.controller';
import { SeasonsService } from './seasons.service';

@Module({
    imports: [TypeOrmModule.forFeature([SeasonEntity])],
    exports: [TypeOrmModule],
    providers: [SeasonsService],
    controllers: [SeasonsController]
})

export class SeasonsModule {}