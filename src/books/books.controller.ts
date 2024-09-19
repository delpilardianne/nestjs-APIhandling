import { Controller, Post, Body, Get, Param, Put, Delete, UseFilters, ParseIntPipe, Patch } from '@nestjs/common';
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
    return {id, message: 'Book has been successfully created'};
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    const bookId = parseInt(id, 10);
    return this.booksService.findOne(bookId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: CreateBookDto
  ) {
    return this.booksService.update(id, updateData);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<CreateBookDto>
  ) {
    return this.booksService.partialUpdate(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    const bookId = parseInt(id, 10);
    this.booksService.remove(bookId);
    return {message: 'Book has been successfully deleted'};
  }
}