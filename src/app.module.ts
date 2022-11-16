import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:password@cluster0.wxdfm.mongodb.net/test'),
    BlogModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
