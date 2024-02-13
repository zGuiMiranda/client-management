import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindClientByIdDto {
  @Expose()
  @IsString({ always: true, message: 'O ID é inválido' })
  @IsNotEmpty({ always: true, message: 'O ID é obrigatório' })
  @IsUUID('4', { always: true, message: 'O ID é inválido' })
  id: string;
}
