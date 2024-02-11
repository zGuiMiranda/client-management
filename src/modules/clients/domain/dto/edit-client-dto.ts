import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

@Exclude()
export class EditClientDto {
  @Expose()
  @IsString({ always: true, message: 'O ID é inválido' })
  @IsNotEmpty({ always: true, message: 'O ID é obrigatório' })
  id: string;

  @Expose()
  @IsString({ always: true, message: 'O nome é inválido' })
  name: string;

  @Expose()
  @IsString({
    always: true,
    message: 'O nome do pai é inválido',
  })
  father_name: string;

  @Expose()
  @IsString({
    always: true,
    message: 'O nome da mãe é inválido',
  })
  mother_name: string;

  @Expose()
  @IsString({
    always: true,
    message: 'O número do telefone é inválido',
  })
  @IsPhoneNumber('BR', {
    always: true,
    message: 'O número do telefone é inválido',
  })
  phone: string;
}
