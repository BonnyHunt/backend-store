import { Injectable, HttpException } from '@nestjs/common';
import { RegisterAuthDto } from 'src/auth/dtos/register-auth.dto';
import { LoginAuthDto } from 'src/auth/dtos/login-auth.dto';
import { User } from 'src/entities/user.entity';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { users } from '../usersDB';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private users: User[] = users;
  private counterId = users.length - 1;

  async register(BodyUser: RegisterAuthDto) {
    this.counterId = this.counterId + 1;
    const { password } = BodyUser;
    const plainToHash = await hash(password, 10);
    const newUser = {
      id: this.counterId,
      ...BodyUser,
      password: plainToHash,
    };
    this.users.push(newUser);
    return newUser;
  }

  async login(BodyUser: LoginAuthDto) {
    const { username, password } = BodyUser;
    const findUser = this.users.find((item) => item.username === username);
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 403);

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);

    const payload = { id: findUser.id, name: findUser.username };
    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token,
    };

    return data;
  }
}
