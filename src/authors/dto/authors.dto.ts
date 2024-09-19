import { IsString, IsNotEmpty, Length, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { CreateBookDto } from '../../books/dto/books.dto';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50, { message: 'name must be between 1 and 50 characters' })
  readonly name: string;

  @IsString()
  @Length(0, 200, { message: 'bio must not exceed 200 characters' })
  readonly bio: string;

  books: CreateBookDto[];

}