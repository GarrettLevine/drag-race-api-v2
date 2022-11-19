import { DataSource } from "typeorm";
import { baseDataSourceOptions } from "./dbTypes";

const datasource = new DataSource({
  ...baseDataSourceOptions,
  migrations: [__dirname + '/../migrations/index.{ts,js}'],
  entities: [__dirname + '/../entities/*.{ts,js}'],
}); // config is one that is defined in datasource.config.ts file
datasource.initialize();
export default datasource; 