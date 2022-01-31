import { TicketDTO } from './dto/ticket.dto';
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
import { Serialize } from 'src/interceptors/serialize.interceptor';
// import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('api/tickets')
@Serialize(TicketDTO)
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get('/')
  // @Serialize(TicketDTO)
  getTickets() {
    return this.ticketService.find();
  }

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
  // @Serialize(TicketDTO)
  createTicket(@Body() body: CreateTicketDTO) {
    return this.ticketService.create(body);
  }

  @Patch('/:id/sell')
  // @Serialize(TicketDTO)
  async updateTicket(
    @Param() params: { id: string },
    @Body() body: { sold: boolean },
  ) {
    return this.ticketService.sellTicket(parseInt(params.id, 10), body.sold);
  }

  @Patch('/validate')
  async validateTicket(@Body() body: UpdateTicketDTO) {
    return this.ticketService.validateTicket(body);
  }
}
