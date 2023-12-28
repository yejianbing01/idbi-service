import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateTaskDto {
  id: number;
  @IsNotEmpty({
    message: '名称不能为空',
  })
  @MaxLength(20, {
    message: '名称最多 20 位',
  })
  name: string;

  @IsNotEmpty({
    message: '执行时间不能为空',
  })
  @MaxLength(20, {
    message: '执行时间最多 20 位',
  })
  cronTime: string;
}
