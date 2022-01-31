import { IsDateString, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateEventDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  type: string;
}
