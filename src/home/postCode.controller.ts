import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { Home } from './entity/home.entity';

@Controller('postCode')
export class PostCodeController {
  constructor(
    @Inject('HOMES_REPOSITORY')
    private homesRepository: typeof Home,
  ) {}
  @Get()
  async list() {
    try {
      const result = await this.homesRepository.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('post_code')), 'post_code'],
        ],
      });
      return { payload: result, count: result.length };
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

  @Get('/:id')
  async getAverageAndMedian(@Param('id') id: string) {
    try {
      const _sequelize = this.homesRepository.sequelize;
      const sql = `SELECT 
        AVG(price) as average,
        (SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY price) FROM "Homes" as h  where h.post_code = '${id}') as median 
      FROM "Homes" as home 
      where home.post_code = '${id}'`;
      const result = await _sequelize.query(sql, { type: QueryTypes.SELECT });
      return result;
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
