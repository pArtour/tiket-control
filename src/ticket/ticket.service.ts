import { EventService } from './../event/event.service';
import { CreateTicketDTO } from './dto/create.ticket.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { Repository } from 'typeorm';
import { UpdateTicketDTO } from './dto/update.ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket) private repo: Repository<Ticket>,
    private eventService: EventService,
  ) {}

  find() {
    return this.repo.find({ relations: ['event'] });
  }

  findByID(id: number) {
    return this.repo.findOne({ id });
  }

  findByEventID(eventID: number) {
    return this.repo.find({ event: eventID });
  }

  async create({ validationCode, event: eventID }: CreateTicketDTO) {
    const event = await this.eventService.findByID(eventID);
    if (!event) {
      throw new BadRequestException({
        error: "Event doesn't exist",
      });
    }

    if (String(validationCode).length < 8) {
      throw new BadRequestException({
        error: 'Invalid barcode',
      });
    }

    const ticket = this.repo.create({
      validationCode,
      event: eventID,
    });
    return this.repo.save(ticket);
  }

  async sellTicket(ticketID: number, sold: boolean) {
    const ticket = await this.repo.findOne(ticketID);
    if (!ticket) {
      throw new NotFoundException({ error: 'Ticket not found' });
    }

    return this.repo.save({ ...ticket, sold });
  }

  async validateTicket(ticketData: UpdateTicketDTO) {
    const ticket = await this.repo.findOne({
      validationCode: ticketData.validationCode,
    });
    if (!ticket) {
      throw new NotFoundException({ error: 'Ticket not found' });
    }

    if (ticket.entered || !ticket.sold) {
      throw new BadRequestException({ error: 'Invalid data' });
    }

    const event = await this.eventService.findByID(ticket.event);

    if (!event) {
      throw new BadRequestException({ error: 'Event does not exist' });
    }

    if (ticket.validationCode !== ticketData.validationCode) {
      throw new BadRequestException({ error: 'Invalid barcode' });
    }

    return this.repo.save({ ...ticket, entered: !ticket.entered });
  }
}
