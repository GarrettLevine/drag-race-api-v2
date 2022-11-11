import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { entitiesArr } from 'src/entities';
import { migrationsArr } from 'src/migrations';

const configService = new ConfigService;

export default new DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PW'),
    database: `${configService.get('DATABASE')}_test`,
    entities: entitiesArr,
    migrations: migrationsArr
});