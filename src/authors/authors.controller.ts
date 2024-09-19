import { Controller, Get, Post, Put, Delete, Patch, Param, Body, UseFilters } from '@nestjs/common';
import { CreateAuthorDto } from './dto/authors.dto';
import { AuthorsService } from './authors.service';
import { WsExceptionFilter } from '../common/filters/http-exception.filter';

@Controller('authors')
@UseFilters(WsExceptionFilter)
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService) {}

  // --> /authors (POST)
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    const author = this.authorsService.create(createAuthorDto);
    return {author, message: 'author has been successfully created'};
  }

  // --> /authors (GET)
  @Get()
  getAll() {
    return this.authorsService.getAll();
  }

  // --> /authors/<id> (GET)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.authorsService.getOne(+id);
  }

//   // --> /authors/<id>/books (GET)
//   @Get(':id/books')
//   findBooks(@Param('id') id: string) {
//     return this.authorsService.findBooks(+id);
//   }

  // --> /authors/<id> (PUT--All properties update)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthorData: CreateAuthorDto
  ) {
    return this.authorsService.update(+id, updateAuthorData);
  }

  // --> /authors/<id> (PATCH--Partial properties update)
  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() updateAuthorData: Partial<CreateAuthorDto>
  ) {
    return this.authorsService.partialUpdate(+id, updateAuthorData);
  }

  // --> /authors/<id> (DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.authorsService.remove(+id);
    return {message: 'author has been successfully deleted'};
  }
}