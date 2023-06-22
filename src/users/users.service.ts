import { Injectable, NotFoundException } from '@nestjs/common';
import { users } from '../usersDB';
import { User } from 'src/entities/user.entity';
import { RegisterAuthDto } from 'src/auth/dtos/register-auth.dto';

@Injectable()
export class UsersService {
  private users: User[] = users;

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return user;
  }

  update(id: number, payload: RegisterAuthDto) {
    const user = this.findOne(id);
    if (!user) {
      return null;
    }
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...payload,
    };
    return this.users[index];
  }

  remove(id: number) {
    const product = this.findOne(id);
    if (!product) {
      throw new NotFoundException(`User #${id} not found`);
    } else {
      const index = this.users.findIndex((item) => item.id === id);
      this.users.splice(index, 1);
      return;
    }
  }
}
