import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @Length( 1, 50, { message: 'Name must be between 1 and 50 characters' } )
  readonly name: string;

  @IsString()
  @Length(0, 200, { message: 'Bio must not exceed 200 characters' })
  readonly bio: string;
}