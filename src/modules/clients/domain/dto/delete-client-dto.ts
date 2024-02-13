import { Expose } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class DeleteClientDto {
  @Expose()
  @IsArray({ always: true, message: 'Formato inválido' })
  @ArrayNotEmpty({ always: true, message: 'Envie ao menos um ID' })
  @IsUUID('4', { each: true, always: true, message: 'O ID é inválido' })
  ids: string[];
}
