import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from '../config/index';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { LeavesModule } from './leave/leave.module';
import { UserController } from './user/user.controller';
import { LeaveController } from './leave/leave.controller';

@Module({
  imports: [
    SequelizeModule.forRoot({
      database: config.database.name,
      username: config.database.username,
      port: Number(config.database.port),
      host: config.database.host,
      dialect: 'postgres',
      password: config.database.password,
      synchronize: true,
      autoLoadModels: true,
    }),
    UserModule,
    LeavesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: 'users/register',
          method: RequestMethod.POST,
        },
        {
          path: 'users/login',
          method: RequestMethod.POST,
        },
      )
      .forRoutes(UserController, LeaveController);
  }
}
