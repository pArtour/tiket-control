import { UpdateTicketDTO } from './dto/update.ticket.dto';
import { CreateTicketDTO } from './dto/create.ticket.dto';
import { TicketService } from './ticket.service';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
// import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('tickets')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get('/:id')
  async findTicket(@Param('id') id: string) {
    const ticket = await this.ticketService.findByID(parseInt(id, 10));
    if (!ticket) {
      throw new NotFoundException({ error: 'Ticket not found' });
    }
    return ticket;
  }

  // @UsePipes(new ValidationPipe())
  @Post('/')
  async createTicket(@Body() body: CreateTicketDTO) {
    return this.ticketService.create(body);
  }

  @Patch('/:id/sell')
  async updateTicket(
    @Param() params: { id: string },
    @Body() body: { sold: boolean },
  ) {
    return this.ticketService.sellTicket(parseInt(params.id, 10), body.sold);
  }

  @Patch('/:id/validate')
  async validateTicket(
    @Param() params: { id: string },
    @Body() body: UpdateTicketDTO,
  ) {
    return this.ticketService.validateTicket(parseInt(params.id, 10), body);
  }
}
