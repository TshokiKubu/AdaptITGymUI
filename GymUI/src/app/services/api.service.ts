import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../models/member';
import { LocalStorageService } from 'angular-web-storage';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUrl: string = "http://localhost:61743/api/v1/Members";

  constructor(private api: HttpClient, private localStorage:LocalStorageService) { }

postMember(member: Member):Observable<Member> {
    return this.api.post<Member>(this.baseUrl, member);
} 

getMemberBId(id: string) {
    return this.api.get<Member[]>(this.baseUrl + "/getMemberById/" + id);
}

getMembers() {
    return this.api.get<Member[]>(this.baseUrl);
}

putMember(member: Member) {
    return this.api.put<Member>(this.baseUrl+"/" + member.id, member);
}


postPayment(payment: Payment):Observable<Payment> {
    return this.api.post<Payment>(this.baseUrl, payment);
}

}
