import { Expose } from 'class-transformer';

export class EventAllDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
