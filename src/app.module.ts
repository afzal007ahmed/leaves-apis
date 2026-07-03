import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from "../config/index"

@Module({
  imports: [
    SequelizeModule.forRoot({
      name : config.database.name ,
      username : config.database.username ,
      port : Number(config.database.port) ,
      host : config.database.host ,
      dialect : "postgres" ,
      password : config.database.password ,
      synchronize : true ,
      autoLoadModels : true 
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
