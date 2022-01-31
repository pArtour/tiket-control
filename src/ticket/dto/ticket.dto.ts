import { TicketEventDTO } from './ticket.event.dto';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class TicketDTO {
  @Expose()
  id: number;

  @Expose()
  validationCode: number;

  @Expose()
  location: string;

  @Expose()
  entered: boolean;

  @Expose()
  sold: boolean;

  @Expose()
  //   @ValidateNested({ always: true })
  @Type(() => TicketEventDTO)
  event: TicketEventDTO;
}
