import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    category.categoryName = createCategoryDto.categoryName;
    return await this.categoryRepository.save(category)
  }

  findAll() : Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category>  {
    return await this.categoryRepository.findOneBy({ id });
  }

  // async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>  {
  //   await this.categoryRepository.update(id);
  // }

  async remove(id: number): Promise<void>  {
    await this.categoryRepository.delete(id);
  }

  async onModuleInit() {
    try {
        const categoryData = [{
          id: 1,
          categoryName: 'News'
        },
        {
          id: 2,
          categoryName: 'Entertainment',
        }
      ];
        const user = await this.categoryRepository.save(categoryData);
        //console.log(user);
    } catch (error) {throw error;}
  }
}
