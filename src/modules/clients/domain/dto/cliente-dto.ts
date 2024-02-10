import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

@Exclude()
export class CreateClientDto {
  @Expose()
  @IsString({ always: true, message: 'O nome é inválido' })
  @IsNotEmpty({ always: true, message: 'O nome é obrigatório' })
  name: string;

  @Expose()
  @IsString({
    always: true,
    message: 'O nome do pai é inválido',
  })
  @IsNotEmpty({
    always: true,
    message: 'O nome do pai é obrigatório',
  })
  father_name: string;

  @Expose()
  @IsString({
    always: true,
    message: 'O nome da mãe é inválido',
  })
  @IsNotEmpty({
    always: true,
    message: 'O nome da mãe é obrigatório',
  })
  mother_name: string;

  @Expose()
  @IsString({
    always: true,
    message: 'O número do telefone é inválido',
  })
  @IsNotEmpty({
    always: true,
    message: 'O número do telefone é obrigatório',
  })
  @IsPhoneNumber('BR', {
    always: true,
    message: 'O número do telefone é inválido',
  })
  phone: string;
}
