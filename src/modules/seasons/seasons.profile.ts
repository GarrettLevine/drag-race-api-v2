import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap } from '@automapper/core';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { SeasonEntity } from '../../entities/season.entity';
import { SeasonDto } from './seasons.types';

@Injectable()
export class SeasonsProfile extends AutomapperProfile {
    constructor (@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, SeasonEntity, SeasonDto);
        }
    }
}
