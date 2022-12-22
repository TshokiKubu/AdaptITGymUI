import { user } from './user';

export interface Member {
  MemberId: number;
  Name: string;
  Surname: string;
  Email: string;
  DateCreated: Date;
 
  Subscription: number;  
  
  id?: string;
  User?: user;
}