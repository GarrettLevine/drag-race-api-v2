import { ConfigService } from "@nestjs/config";
import { entitiesArr } from "src/entities";
import { migrationsArr } from "src/migrations";
import { DataSource } from "typeorm";
import { baseDataSourceOptions } from "./dbTypes";

const configService = new ConfigService;

export default new DataSource({
    ...baseDataSourceOptions,
    entities: entitiesArr,
    migrations: migrationsArr
});