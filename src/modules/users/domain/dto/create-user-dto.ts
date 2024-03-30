import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { IsCPF } from 'class-validator-cpf';

export class CreateUserDto {
  @Expose()
  @IsString({ always: true, message: 'O login é inválido' })
  @IsNotEmpty({ always: true, message: 'O login é obrigatório' })
  @IsCPF({ message: 'CPF inválido' })
  login: string;

  @Expose()
  @IsString({
    always: true,
    message: 'A senha é inválida',
  })
  @IsNotEmpty({
    always: true,
    message: 'A senha obrigatório',
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { always: true, message: 'A senha não é forte o suficiente.' },
  )
  password: string;
}
