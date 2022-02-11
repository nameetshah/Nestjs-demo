import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @ApiProperty()
  @IsString()
  @IsAlphanumeric()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  date: string;
}
