// import { TicketService } from './../ticket/ticket.service';
import { CreateEventDTO } from './dto/create.event.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private repo: Repository<Event>, // private ticketService: TicketService,
  ) {}

  find() {
    // const tickets = await this.ticketService.
    return this.repo.find({ relations: ['tickets'] });
  }

  findByID(id: number) {
    return this.repo.findOne(id);
  }

  async createEvent(eventData: CreateEventDTO) {
    const event = await this.repo.find({
      name: eventData.name,
    });
    if (event.length) {
      throw new BadRequestException({
        error: 'Event already exists',
      });
    }

    const newEvent = this.repo.create(eventData);
    return this.repo.save(newEvent);
  }

  async getAll() {
    return this.repo.find();
  }
}
