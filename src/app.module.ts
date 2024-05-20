/* eslint-disable prettier/prettier */
import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler'
// import { AuthMiddleware } from './Middleware/Auth.middleware';
import config from './config/db'

@Module({
  imports: [UserModule, TaskModule, MongooseModule.forRoot(config.host),ThrottlerModule.forRoot([{
    ttl: 60000,
    limit: 10,
  }]) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
