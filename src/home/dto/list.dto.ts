import { Type } from 'class-transformer';
import { IsInt, IsNumber, Max, Min } from 'class-validator';

export class ListDto {
  @IsNumber()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  readonly take: number;

  @IsNumber()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  readonly skip: number;
}
