import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/posts.service';
import { PostsController } from './posts/posts.controller';
import { UsersController } from './users/users.controller';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { ConfigModule} from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig), ConfigModule.forRoot({isGlobal: true}),
    AuthModule, UsersModule, CategoriesModule, PostsModule],
  controllers: [CategoriesController, PostsController, UsersController],
  providers: [CategoriesService, PostsService],
})
export class AppModule {}