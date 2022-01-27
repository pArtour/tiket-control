import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { EventTicketDTO } from './event.ticket.dto';

export class EventDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  location: string;

  @Expose()
  type: string;

  @Expose()
  barCode: number;

  @Expose()
  @ValidateNested({ always: true })
  @Type(() => EventTicketDTO)
  tickets: EventTicketDTO[];
}
