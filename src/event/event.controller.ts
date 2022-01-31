import { CreateEventDTO } from './dto/create.event.dto';
import { EventService } from './event.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { EventDTO } from './dto/event.dto';
import { EventAllDTO } from './dto/event.all.dto';

@Controller('api/events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('/')
  @Serialize(EventDTO)
  getEvents() {
    return this.eventService.find();
  }

  @Get('/all')
  @Serialize(EventAllDTO)
  getAll() {
    return this.eventService.getAll();
  }

  @Post('/')
  @Serialize(EventDTO)
  createEvent(@Body() body: CreateEventDTO) {
    return this.eventService.createEvent(body);
  }
}
