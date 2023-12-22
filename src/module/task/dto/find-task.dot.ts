import { PaginationDto } from 'src/module/base/pagination.dto';
import { TaskFlag } from '../config/task-flag.enum';

export class FindTaskDto extends PaginationDto {
  name?: string;
  flag?: TaskFlag;
}
