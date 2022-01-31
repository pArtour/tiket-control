import { Expose } from 'class-transformer';

export class TicketEventDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
