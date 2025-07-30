import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseData } from 'src/global/class';
import { ResponseMessage, ResponseStatus } from 'src/global/enum';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dto/products';

@Controller('products')
//return inceptore product form the client
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return {
      statusCode: -1,
      message: 'Success222',
      data: this.productsService.getProducts(),
    };
  }

  @Post('/create')
  createProduct(@Body() body: CreateProductDto) {
    try {
      const res = this.productsService.createProduct(body);
      console.log(res);
      return {
        statusCode: res?.statusCode,
        message: res?.message,
      };
    } catch (error) {
      return new ResponseData<string>(
        '',
        ResponseStatus.INTERNAL_SERVER_ERROR,
        ResponseMessage.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    try {
      const product = this.productsService.getProduct(id);
      if (!product) {
        return {
          statusCode: -1,
          message: 'Product not found',
          data: null,
        };
      }
      return {
        statusCode: 1,
        message: 'Success',
        data: product,
      };
    } catch (error) {
      return new ResponseData<string>(
        '',
        ResponseStatus.INTERNAL_SERVER_ERROR,
        ResponseMessage.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body()
    body: { name: string; price: number; categoryId: string },
  ) {
    try {
      const res = this.productsService.updateProduct(id, body);
      if (!res) {
        return {
          statusCode: -1,
          message: 'Product not found',
          data: null,
        };
      }
      return {
        statusCode: 1,
        message: 'Success',
      };
    } catch (error) {
      return new ResponseData<string>(
        null,
        ResponseStatus.INTERNAL_SERVER_ERROR,
        ResponseMessage.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    try {
      const product = this.productsService.deleteProduct(id);
      return new ResponseData<string>(
        product,
        ResponseStatus.SUCCESS,
        ResponseMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        ResponseStatus.INTERNAL_SERVER_ERROR,
        ResponseMessage.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
