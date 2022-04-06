import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HomeDto } from './dto/home.dto';
import { ListDto } from './dto/list.dto';
import { Home } from './entity/home.entity';

@Controller('home')
export class HomeController {
  constructor(
    @Inject('HOMES_REPOSITORY')
    private homesRepository: typeof Home,
  ) {}
  @Post()
  async create(@Body() home: HomeDto) {
    try {
      const saved = await this.homesRepository.create(home);
      return { success: true, data: saved };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/:id')
  async update(@Body() home: HomeDto, @Param('id', ParseIntPipe) id: number) {
    try {
      await this.homesRepository.update(home, { where: { id: id } });
      return { success: true };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.homesRepository.destroy({ where: { id: id } });
      return { success: true };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async list(@Query() query: ListDto) {
    try {
      const result = await this.homesRepository.findAndCountAll({
        attributes: ['id', 'name', 'desc', 'price', 'post_code'],
        where: {},
        limit: query.take,
        offset: query.skip,
      });
      return { payload: result.rows, count: result.count };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
