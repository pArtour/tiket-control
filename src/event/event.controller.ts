import { CreateEventDTO } from './dto/create.event.dto';
import { EventService } from './event.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { EventDTO } from './dto/event.dto';

@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('/')
  @Serialize(EventDTO)
  async getEvents() {
    return this.eventService.find();
  }

  @Post('/')
  async createEvent(@Body() body: CreateEventDTO) {
    return this.eventService.createEvent(body);
  }
}
