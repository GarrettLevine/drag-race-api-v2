import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { baseDataSourceOptions } from '../utils/dbTypes';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                ...baseDataSourceOptions,
                autoLoadEntities: true
            })
        })
    ],
})
export class DataBaseModule {}