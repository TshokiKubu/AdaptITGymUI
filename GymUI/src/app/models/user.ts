import { Member } from './member';

export interface user {
  id: number;
  userName: string; 
  password: string;
  role: string;
  // email: string;
 // confirmPassword: string;
 // dob: Date;

  members: Member[];
}
