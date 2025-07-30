import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/models/products';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    new Product({ id: 1, name: 'Product 1', price: 100, categoryId: '1' }),
    new Product({ id: 2, name: 'Product 2', price: 200, categoryId: '2' }),
  ];

  getProducts(): Product[] {
    return this.products;
  }

  createProduct(body: {
    id: string;
    name: string;
    price: number;
    categoryId: string;
  }) {
    //example json

    const product = new Product(body);
    this.products.push(product);
    console.log(product);
    return {
      statusCode: 1,
      message: 'Product created',
    };
  }

  getProduct(id: string): Product {
    const product = this.products.find(
      (product) => product.id === parseInt(id),
    );
    return product!;
  }

  updateProduct(
    id: string,
    body: { name: string; price: number; categoryId: string },
  ) {
    const product = this.products.find(
      (product) => product.id === parseInt(id),
    );

    product!.name = body.name;
    product!.price = body.price;
    product!.categoryId = body.categoryId;

    return product;
  }

  deleteProduct(id: string) {
    const product = this.products.find(
      (product) => product.id === parseInt(id),
    );
    this.products = this.products.filter(
      (product) => product.id !== parseInt(id),
    );
    return 'Product deleted';
  }
}
