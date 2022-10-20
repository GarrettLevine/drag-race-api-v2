import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { modulesArr } from './modules';
import { DataBaseModule } from './modules/database.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    DataBaseModule,
    ...modulesArr
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
