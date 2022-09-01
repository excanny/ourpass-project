import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = userDto.username;
    user.password = userDto.password;
    return this.usersRepository.save(user)
  }

  async encryptPassword(password:string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async onModuleInit() {

    var encryptedPassword1 =  await this.encryptPassword('john@gmail.com');
    var encryptedPassword2 =  await this.encryptPassword("ken@gmail.com");
    try {
        const usersData = [{
          userId: 1,
          username: 'john@gmail.com',
          password: 'john@gmail.com',
        },
        {
          userId: 2,
          username: 'ken@gmail.com',
          password: encryptedPassword2,
        }
      ];
        const user = await this.usersRepository.save(usersData);
        //console.log(user[1].password);
    } catch (error) {throw error;}
  }
}