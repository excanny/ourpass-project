import { Body, Controller, HttpStatus, Param, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';


@Controller('users')
export class UsersController {
    constructor(private authService: AuthService, private readonly userService: UsersService) {}

    @Post('register')
    async register(@Body() userData: CreateUserDto) {
        return await this.userService.create(userData);
      }

    // /  @UseGuards(LocalAuthGuard)
    //   @Post('login')
    //   async login(@Request() req) {
    //     return this.authService.login(req.user);
    //   }

    // @Get('/allusers')
    // async allusers(): Promise<User[]> {
    //   return await this.userService.findAll();
    // }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

    ///@UseGuards(JwtAuthGuard)
    @Get('user-info')
    getUserInfo(@Request() req) {
      return req.user
    }
}
