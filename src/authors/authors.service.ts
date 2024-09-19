import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/authors.dto';
import { UpdateAuthorDto } from './dto/updateauthors.dto';


@Injectable()
export class AuthorsService {
  private authors: Map<number, CreateAuthorDto> = new Map();
  private nextId = 1;

  create(author: CreateAuthorDto) {
    const id = this.nextId++;
    this.authors.set(id, author);
    return id;
  }

  findAll(): CreateAuthorDto[] {
    return Array.from(this.authors.values());
  }

  findOne(id: number): CreateAuthorDto {
    const author = this.authors.get(id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} cannot be found`);
    }
    return author;
  }

  update(id: number, updateAuthor: UpdateAuthorDto): CreateAuthorDto {
    if (!this.authors.has(id)) {
        throw new NotFoundException(`Author with ID ${id} not found`);
    }
    const author = this.authors.get(id);
      const updatedAuthor = { ...author, ...updateAuthor };
      this.authors.set(id, updatedAuthor);
      return updatedAuthor;
  }

  partialUpdate(id: number, updateData: Partial<CreateAuthorDto>): CreateAuthorDto {
    if (!this.authors.has(id)) {
        throw new NotFoundException(`Author with ID ${id} not found`);
    }
    const author = this.findOne(id);
    const updatedAuthor = { ...author, ...updateData };
    this.authors.set(id, updatedAuthor);
    return updatedAuthor;
  }

  remove(id: number): void {
    if (!this.authors.delete(id)) {
      throw new NotFoundException(`Author with ID ${id} cannot be found`);
    }
  }
}