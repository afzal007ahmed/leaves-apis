import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from "../config/index"
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      database : config.database.name ,
      username : config.database.username ,
      port : Number(config.database.port) ,
      host : config.database.host ,
      dialect : "postgres" ,
      password : config.database.password ,
      synchronize : true ,
      autoLoadModels : true 
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
