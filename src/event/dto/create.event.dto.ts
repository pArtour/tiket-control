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
  date: Date;

  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber(undefined, {
    message: (args) => {
      console.log({ args });
      return `${args.property} is ${args.value}`;
    },
  })
  barCode: number;
}
