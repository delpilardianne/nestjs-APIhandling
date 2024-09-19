import { Controller, Post, Body, Get, Param, Put, Delete, UseFilters, Patch } from '@nestjs/common';
import { CreateBookDto } from './dto/books.dto';
import { BooksService } from './books.service';
import { WsExceptionFilter } from '../common/filters/http-exception.filter';

@Controller('books')
@UseFilters(WsExceptionFilter)
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    const id = this.booksService.create(createBookDto);
    return {id, message: 'book has been successfully created'};
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: CreateBookDto
  ) {
    return this.booksService.update(+id, updateData);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateBookDto>
  ) {
    return this.booksService.partialUpdate(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.booksService.remove(+id);
    return {message: 'book has been successfully deleted'};
  }
}