import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/authors.dto';
import { CreateBookDto } from '../books/dto/books.dto';

@Injectable()
export class AuthorsService {
  private authors: Map<number, CreateAuthorDto> = new Map();
  private nextId = 1;

  create(author: CreateAuthorDto) {
    const id = this.nextId++;
    this.authors.set(id, author);
    return id;
  }

  getAll(): CreateAuthorDto[] {
    return Array.from(this.authors.values());
  }

  getOne(id: number): CreateAuthorDto {
    const author = this.authors.get(id);
    if (!author) {
      throw new NotFoundException(`author with ID ${id} cannot be found`);
    }
    return author;
  }

  findBooks(id: number): CreateBookDto[] {
    const author = this.getOne(id);
    return author.books;
  }

  update(id: number, updateAuthor: CreateAuthorDto) {
    if (!this.authors.has(id)) {
        throw new NotFoundException(`author with ID ${id} not found`);
    }
    const author = this.authors.get(id);
      const updatedAuthor = { ...author, ...updateAuthor };
      this.authors.set(id, updatedAuthor);
      return updatedAuthor;
  }

  partialUpdate(id: number, updateData: Partial<CreateAuthorDto>): CreateAuthorDto {
    if (!this.authors.has(id)) {
        throw new NotFoundException(`author with ID ${id} not found`);
    }
    const author = this.getOne(id);
    const updatedAuthor = { ...author, ...updateData };
    this.authors.set(id, updatedAuthor);
    return updatedAuthor;
  }

  remove(id: number): void {
    if (!this.authors.delete(id)) {
      throw new NotFoundException(`author with ID ${id} cannot be found`);
    }
  }
}