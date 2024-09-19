import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe, UseFilters, ParseIntPipe, Patch } from '@nestjs/common';
import { CreateAuthorDto } from './dto/authors.dto';
import { AuthorsService } from './authors.service';
// import { UpdateAuthorDto } from './dto/updateauthors.dto';
import { WsExceptionFilter } from '../common/filters/http-exception.filter';

@Controller('authors')
@UseFilters(WsExceptionFilter)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
  create(@Body() createAuthorDto: CreateAuthorDto) {
    const id = this.authorsService.create(createAuthorDto);
    return {id, message: 'Author has been successfully created'};
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    const authorId = parseInt(id, 10);
    return this.authorsService.findOne(authorId);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorData: CreateAuthorDto
  ) {
    return this.authorsService.update(id, updateAuthorData);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorData: Partial<CreateAuthorDto>
  ) {
    return this.authorsService.partialUpdate(id, updateAuthorData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const authorId = parseInt(id, 10);
    this.authorsService.remove(authorId);
    return {message: 'Author has been successfully deleted'};
  }
}