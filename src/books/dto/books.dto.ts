import { IsString, IsNotEmpty, Length, IsInt, Min, Max } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @Length( 1, 100, { message: 'Title must be between 1 and 100 characters' } )
  readonly title: string;

  @IsString()
  @Length( 1, 50, { message: 'Author must be between 1 and 50 characters' } )
  readonly author: string;

  @IsString()
  @Length(13, 13, { message: 'ISBN must be a valid 13-digit ISBN' } )
  readonly isbn: string;

  @IsInt()
  @Min( 1000, { message: 'Published year must be a valid year' } )
  @Max( new Date().getFullYear(), { message: 'Published year must be a valid year' } )
  readonly publishedYear: number;
}