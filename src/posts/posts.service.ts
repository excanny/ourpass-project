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

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    return await this.postRepository.delete(id);
  }

  async onModuleInit() {
    try {

        const postsData = [{
          id: 1,
          categoryId: 1,
          title: 'First topic',
          content: 'This is John\'s post',
          user: await this.usersRepository.findOneBy({userId:1})
        },
        {
          id: 2,
          categoryId: 2,
          title: 'Second Topic',
          content: 'This is Ken\'s post',
          user: await this.usersRepository.findOneBy({userId:2}),
        }
      ];
      const posts = await this.postRepository.save(postsData);
        //console.log(posts);
    } catch (error) {throw error;}
  }
  
}
