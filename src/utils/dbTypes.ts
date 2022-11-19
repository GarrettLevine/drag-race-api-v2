import { ConfigService } from "@nestjs/config";
import { DataSourceOptions } from "typeorm";

const configService = new ConfigService;

export const baseDataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PW'),
    database: configService.get('NODE_ENV') === 'test' ? `${configService.get('DATABASE')}_test` : configService.get('DATABASE'),
} as DataSourceOptions;