import { IsInt } from 'class-validator';

/**
 * 分页信息
 */
export class PaginationDto {
  @IsInt()
  pageNo: number = 1;
  @IsInt()
  pageSize: number = 20;
}
