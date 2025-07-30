import { MinLength } from 'class-validator';

export class CreateProductDto {
  id: string;

  @MinLength(3, { message: 'test custom message' })
  name: string;

  price: number;

  categoryId: string;
}
