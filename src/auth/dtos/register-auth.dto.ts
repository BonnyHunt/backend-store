import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsString()
  role: string;
}
