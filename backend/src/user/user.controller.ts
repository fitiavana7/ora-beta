import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetUserByIdDto } from './dto/get-by-id.dto';
import { GetByMailDto } from './dto/get-mail.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from './dto/user.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private userService : UserService
    ){}

    @Get()
    getUser(){
        return this.userService.getAllUsers()
    }

    @Get("/mail/:mail")
    getByMail(@Param() data  :GetByMailDto){
        return this.userService.getByMail(data)
    }

    @Get("/:userId")
    getById(@Param() data  :GetUserByIdDto){
        return this.userService.getById(data)
    }

    @Post()
    create(@Body() data : UserDto){
        return this.userService.create(data)
    }

    @Post("/login")
    login(@Body() data  :LoginUserDto){
        return this.userService.login(data)
    }

    @Get("/verify/:token")
    async verify(@Param() data  : VerifyTokenDto ){                
        return await this.userService.verifyToken(data)
    }
}
