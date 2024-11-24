import {UserDto} from './UserDto';

export interface CommentsDto {

  id: number;

  comment: string;

  sender: UserDto;

  createdAt: Date;
}
