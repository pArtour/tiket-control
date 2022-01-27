import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTicketDTO {
  @IsNotEmpty()
  @IsNumber(undefined, {
    message: (args) => {
      return args.value
        ? `${args.property} is invalid`
        : `${args.property} is ${args.value}`;
    },
  })
  validationCode: number;

  @IsNumber()
  @IsNotEmpty()
  event: number;
}
