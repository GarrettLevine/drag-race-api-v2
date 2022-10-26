import { ConfigService } from "@nestjs/config";
import { entitiesArr } from "src/entities";
import { migrationsArr } from "src/migrations";
import { DataSource } from "typeorm";

const configService = new ConfigService;

export default new DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PW'),
    database: configService.get('DATABASE'),
    entities: entitiesArr,
    migrations: migrationsArr
});