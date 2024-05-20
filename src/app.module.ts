/* eslint-disable prettier/prettier */
import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthMiddleware } from './Middleware/Auth.middleware';
import config from './config/db'

@Module({
  imports: [UserModule, TaskModule, MongooseModule.forRoot(config.host)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
