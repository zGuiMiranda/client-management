import { ClientFilter } from './domain/interfaces/client-filter';
import { FindAllClientsUseCase } from './application/find-all-clients-use-case';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { badRequest, ok, serverError } from '../../helpers/http-helper';
import { HttpResponse } from '../../shared/interfaces';
import { CreateClientUseCase } from './application/create-client-use-case';
import { CreateClientDto } from './domain/dto/create-cliente-dto';
import { plainToClass } from 'class-transformer';
import Client from './domain/entities/client.entity';
import { Pagination } from '../../shared/pagination';
import { PagerInterceptor } from '../../shared/interceptors/pager.interceptor';
import { EditClientUseCase } from './application/edit-client-use-case';
import { EditClientDto } from './domain/dto/edit-client-dto';
import { FindClientByIdDto } from './domain/dto/find-client-by-id-dto';
import { FindClientByIdUseCase } from './application/find-client-by-id-use-case';
import { DeleteClientUseCase } from './application/delete-client-use-case';
import { DeleteClientDto } from './domain/dto/delete-client-dto';

@Controller('clients')
export class ClientsController {
  constructor(
    private findAllClientsUseCase: FindAllClientsUseCase,
    private createClientUseCase: CreateClientUseCase,
    private editClientUseCase: EditClientUseCase,
    private findClientByIdUseCase: FindClientByIdUseCase,
    private deleteClientUseCase: DeleteClientUseCase,
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
      return serverError('Erro ao procurar clientes' + error);
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
      return serverError('Erro ao criar cliente' + error);
    }
  }
  @Put('edit')
  async updateClient(
    @Body() editClientDto: EditClientDto,
  ): Promise<HttpResponse> {
    try {
      const response = await this.editClientUseCase.execute(
        plainToClass(Client, editClientDto),
      );
      if (response.isLeft())
        return badRequest(Error(response?.value?.toString()));

      return ok(response.value);
    } catch (error) {
      return serverError('Erro ao editar cliente' + error);
    }
  }
  @Get('findById')
  async findClientById(
    @Query() findClientById: FindClientByIdDto,
  ): Promise<HttpResponse> {
    try {
      const response = await this.findClientByIdUseCase.execute(
        findClientById.id,
      );
      if (response.isLeft())
        return badRequest(Error(response?.value?.toString()));
      return ok(response.value);
    } catch (error) {
      return serverError('Erro ao procurar cliente' + error);
    }
  }

  @Delete('delete')
  async delete(
    @Query() deleteClientDto: DeleteClientDto,
  ): Promise<HttpResponse> {
    try {
      const response = await this.deleteClientUseCase.execute(
        deleteClientDto.ids,
      );
      if (response.isLeft())
        return badRequest(Error(response?.value?.toString()));
      return ok(response.value);
    } catch (error) {
      return serverError('Erro ao procurar cliente' + error);
    }
  }
}
