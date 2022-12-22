import { Member } from './member';

export interface Payment {
  PaymentId: number;
  Amount: string; 
  RenewalDate: Date;
  Subscription: number;
  MemberId?: number;
  Member?: Member[];
}