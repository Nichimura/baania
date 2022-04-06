import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, MinLength } from 'class-validator';

export class HomeDto {
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  readonly desc: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsNotEmpty()
  readonly post_code: string;
}
