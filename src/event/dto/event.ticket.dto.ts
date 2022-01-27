import { Expose } from 'class-transformer';
export class EventTicketDTO {
  @Expose()
  id: number;

  @Expose()
  validationCode: number;

  @Expose()
  sold: boolean;

  @Expose()
  entered: boolean;
}
