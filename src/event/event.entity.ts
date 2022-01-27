import { Ticket } from './../ticket/ticket.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  date: Date;

  @Column()
  type: string;

  @Column()
  barCode: number;

  // @Column({ array: true, nullable: false, default: [] })
  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];
}
