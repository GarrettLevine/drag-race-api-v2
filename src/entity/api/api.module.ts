import { Module } from '@nestjs/common';
import { SeasonModule } from '../seasons/seasons.module';
import { ApiController } from './api.controller';

@Module({
    imports: [SeasonModule],
    controllers: [ApiController]
})

export class ApiModule {}