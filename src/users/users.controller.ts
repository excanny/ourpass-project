import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';


@Controller('users')
export class UsersController {
    constructor(private authService: AuthService, private readonly userService: UsersService) {}

    @Post('register')
    async register(@Body() userData: CreateUserDto) {
        return await this.userService.create(userData);
      }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
}
