import { EventModule } from './../event/event.module';
import { Ticket } from './ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), EventModule],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
