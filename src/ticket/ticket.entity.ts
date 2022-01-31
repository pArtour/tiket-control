import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Event } from 'src/event/event.entity';
import { TicketEventDTO } from './dto/ticket.event.dto';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  validationCode: number;

  @Column({ default: false })
  entered: boolean;

  @Column({ default: false })
  sold: boolean;

  @Column({ nullable: false })
  @ManyToOne(() => Event, (event) => event.tickets)
  event: number;
}
