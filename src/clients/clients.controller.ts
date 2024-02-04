import { ClientFilter } from 'src/clients/domain/filter/client-filter';
import { FindAllClientsUseCase } from './application/find-all-clients-use-case';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { badRequest, ok, serverError } from '../helpers/http-helper';
import { HttpResponse } from '../shared/interfaces';
import { CreateClientUseCase } from './application/create-client-use-case';
import { CreateClientDto } from './domain/dto/cliente-dto';
import { plainToClass } from 'class-transformer';
import Client from './domain/entities/client.entity';
import { Pagination } from 'src/shared/pagination';
import { PagerInterceptor } from 'src/shared/interceptors/pager.interceptor';

@Controller('client')
export class ClientsController {
  constructor(
    private findAllClientsUseCase: FindAllClientsUseCase,
    private createClientUseCase: CreateClientUseCase,
  ) {}

  @UseInterceptors(PagerInterceptor)
  @Get('findAll')
  async findAll(
    @Query()
    queryParams: {
      name: string;
      father_name: string;
      mother_name: string;
      phone: string;
      hasPagination: boolean;
      page: number;
      size: number;
      skip: number;
    },
  ): Promise<HttpResponse> {
    try {
      const {
        name,
        father_name,
        mother_name,
        phone,
        page,
        size,
        skip,
        hasPagination,
      } = queryParams;

      const response = await this.findAllClientsUseCase.execute(
        new ClientFilter(
          name,
          father_name,
          mother_name,
          phone,
          new Pagination(page, size, skip, hasPagination),
        ),
      );

      if (response.isLeft())
        return badRequest(Error(response?.value?.toString()));

      return ok(response.value);
    } catch (error) {
      return serverError('Erro ao procurar os clientes' + error);
    }
  }

  @Post('create')
  async createClient(
    @Body() createClientDto: CreateClientDto,
  ): Promise<HttpResponse> {
    try {
      const response = await this.createClientUseCase.execute(
        plainToClass(Client, createClientDto),
      );
      if (response.isLeft())
        return badRequest(Error(response?.value?.toString()));

      return ok(response.value);
    } catch (error) {
      return serverError('Erro ao procurar os clientes' + error);
    }
  }
}
