import { IsString, IsNotEmpty, Length, IsInt, Min, Max } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @Length( 1, 100, { message: 'title must be between 1 and 100 characters' } )
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @Length( 1, 50, { message: 'author must be between 1 and 50 characters' } )
  readonly author: string;
}