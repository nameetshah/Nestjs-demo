import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private id = 1;

  create(createUserDto: CreateUserDto) {
    const users = {
      id: this.id++,
      ...createUserDto,
    };
    this.users.push(users);
    return users;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const data = this.users.find((value) => value.id === id);

    if (!data) {
      return 'User not found';
    } else {
      return data;
    }
  }

  // findByName(name: string) {
  //   const val = this.users.find((value) => value.name === name);
  //
  //   if (!val) {
  //     return 'Name not found';
  //   } else {
  //     return val;
  //   }
  // }
  //
  // findByUsername(username: string) {
  //   const val = this.users.find((value) => value.username === username);
  //
  //   if (!val) {
  //     return 'Name not found';
  //   } else {
  //     return val;
  //   }
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    const objIndex = this.users.findIndex((obj) => obj.id == id);

    if (objIndex == -1) return 'Users not found';

    this.users[objIndex].name = updateUserDto.name;
    this.users[objIndex].username = updateUserDto.username;
    this.users[objIndex].password = updateUserDto.password;
    this.users[objIndex].email = updateUserDto.email;
    this.users[objIndex].date = updateUserDto.date;

    return this.users[objIndex];
  }

  remove(id: number) {
    const data = this.users.find((value) => value.id == id);

    if (!data) {
      return 'not found';
    } else {
      this.users.splice(
        this.users.findIndex((value) => value.id == id),
        1,
      );
      return data;
    }
  }
}
