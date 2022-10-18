import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonModule } from './entity/seasons/seasons.module';
import { Season } from './entity/seasons/season.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DATABASE,
      entities: [Season]
    }),
    SeasonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
