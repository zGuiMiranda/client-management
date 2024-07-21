import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { badRequest, ok, serverError } from '../../helpers/http-helper';
import { HttpResponse } from '../../shared/interfaces';
import { CreateUserDto } from './domain/dto/create-user-dto';
import User from './domain/entities/user.entity';
import { CreateUserUseCase } from './application/create-user-use-case';
import { LoginUseCase } from './application/login-use-case';
import { DeleteUserUseCase } from './application/delete-user-use-case';

@Controller('users')
export class UsersController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private loginUseCase: LoginUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post('create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<HttpResponse> {
    try {
      const response = await this.createUserUseCase.execute(
        plainToClass(User, createUserDto),
      );
      if (response.isLeft())
        return badRequest(Error(response?.value?.toString()));

      return ok(response.value);
    } catch (error) {
      return serverError('Erro ao criar usuário ' + error);
    }
  }

  @Delete('delete')
  async delete(
    @Query()
    id: string,
  ): Promise<HttpResponse> {
    try {
      const response = await this.deleteUserUseCase.execute(
        plainToClass(User, id),
      );
      if (response.isLeft())
        return badRequest(Error(response?.value?.toString()));

      return ok(response.value);
    } catch (error) {
      return serverError('Erro ao excluir usuário ' + error);
    }
  }

  @Get('login')
  async login(
    @Query()
    loginDto: {
      login: string;
      password: string;
    },
  ): Promise<HttpResponse> {
    try {
      const response = await this.loginUseCase.execute(
        plainToClass(User, loginDto),
      );
      if (response.isLeft())
        return badRequest(Error(response?.value?.toString()));

      return ok(response.value);
    } catch (error) {
      return serverError('Erro ao criar usuário ' + error);
    }
  }
}
