import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaClient, Prisma } from '@prisma/client';
import { STATUS_CODES } from 'http';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  // private users: User[] = [];
  // private id = 1;

  async create(createUserDto: CreateUserDto) {
    try {
      const insertUser = await prisma.user.create({
        data: {
          name: createUserDto.name,
          username: createUserDto.username,
          password: createUserDto.password,
          email: createUserDto.email,
          date: createUserDto.date,
        },
      });

      return insertUser;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          // console.log(
          //   'There is a unique constraint violation, a new user cannot be created with this email',
          // );
          throw new BadRequestException('Username or email already exists');
        }
      }
      throw e;
    }

    // if (
    //   prisma.user(
    //       createUserDto.email == createUser.email &&
    //       createUserDto.username == createUser.username,
    //   )
    // ) {
    //   throw new BadRequestException('hadsij');
    // }

    // if (
    //   this.users.find(
    //     (x) =>
    //       createUserDto.email == x.email &&
    //       createUserDto.username == x.username,
    //   )
    // ) {
    //   throw new BadRequestException('Username and email already exists');
    // } else if (this.users.find((x) => createUserDto.email == x.email)) {
    //   throw new BadRequestException('Email already exists');
    // } else if (this.users.find((x) => createUserDto.username == x.username)) {
    //   throw new BadRequestException('Username already exists');
    // } else {
    //   const users = {
    //     id: this.id++,
    //     ...createUserDto,
    //   };
    //   this.users.push(users);
    //   return users;
    // }
  }

  async findAll() {
    const findAllUsers = await prisma.user.findMany();
    return findAllUsers;
  }
  //
  async findOne(id: number) {
    const findSingleUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return findSingleUser;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   const objIndex = this.users.findIndex((obj) => obj.id == id);
  //
  //   if (objIndex == -1) throw new BadRequestException('User not found');
  //
  //   this.users[objIndex].name = updateUserDto.name;
  //   this.users[objIndex].username = updateUserDto.username;
  //   this.users[objIndex].password = updateUserDto.password;
  //   this.users[objIndex].email = updateUserDto.email;
  //   this.users[objIndex].date = updateUserDto.date;
  //
  //   return this.users[objIndex];
  // }
  //
  //   remove(id: number) {
  //     const data = this.users.find((value) => value.id == id);
  //
  //     if (!data) {
  //       throw new BadRequestException('Not found');
  //     } else {
  //       this.users.splice(
  //         this.users.findIndex((value) => value.id == id),
  //         1,
  //       );
  //       return data;
  //     }
  //   }
  // }
}
