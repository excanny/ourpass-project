// import { Module } from '@nestjs/common';
// import { CategoriesService } from './categories.service';
// import { CategoriesController } from './categories.controller';

// @Module({
//   controllers: [CategoriesController],
//   providers: [CategoriesService]
// })
// export class CategoriesModule {}

import { Module } from '@nestjs/common';
import { Category } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    exports: [TypeOrmModule]
})
export class CategoriesModule {}

