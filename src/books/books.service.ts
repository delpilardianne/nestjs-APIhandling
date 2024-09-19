import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/books.dto';

@Injectable()
export class BooksService {
	private books: Map<number, CreateBookDto> = new Map();
	private lastId = 0;

	create(createBookDto: CreateBookDto): number {
		const id = ++this.lastId;
		this.books.set(id, createBookDto);
		return id;
	}

	findAll(): CreateBookDto[] {
		return Array.from(this.books.values());
	}

	findOne(id: number): CreateBookDto {
		const book = this.books.get(id);
		if (!book) {
			throw new NotFoundException(`Book with ID ${id} cannot be found`);
		}
		return book;
	}

    update(id: number, updateBookDto: CreateBookDto) {
        if (!this.books.has(id)) {
          throw new NotFoundException(`Book with ID ${id} not found`);
        }
        const book = this.books.get(id);
        const updatedBook = { ...book, ...updateBookDto };
        this.books.set(id, updatedBook);
        return updatedBook;
      }

    partialUpdate(id: number, updateData: Partial<CreateBookDto>): CreateBookDto {
        if (!this.books.has(id)) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        const book = this.findOne(id);
        const updatedBook = { ...book, ...updateData };
        this.books.set(id, updatedBook);
        return updatedBook;
    }

    remove(id: number): void {
		if (!this.books.delete(id)) {
			throw new NotFoundException(`Book with ID ${id} cannot be found`);
		}
	}    
}