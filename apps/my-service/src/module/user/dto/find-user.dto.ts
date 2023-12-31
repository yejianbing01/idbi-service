import { PaginationDto } from '../../base/pagination.dto';

export class FindUserDto extends PaginationDto {
  username?: string;
  nickname?: string;
  email?: string;
}
