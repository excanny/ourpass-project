import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>, @InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createPostDto: CreatePostDto) {
    const post = new Post();
    post.categoryId = createPostDto.categoryId;
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    return await this.postRepository.save(post)
  }

  findAll() {
    return this.postRepository.find();
  }

  async findOne(id: number) {
    return await this.postRepository.findOneBy({ id });
  }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  async remove(id: number) {
    await this.postRepository.delete(id);
  }
  
}
