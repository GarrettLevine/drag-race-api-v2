import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from './season.entity';
import { SeasonsController } from './seasons.controller';
import { SeasonsService } from './seasons.service';

@Module({
    imports: [TypeOrmModule.forFeature([Season])],
    exports: [TypeOrmModule],
    providers: [SeasonsService],
    controllers: [SeasonsController]
})

export class SeasonModule {}