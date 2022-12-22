import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-updatemember',
  templateUrl: './updatemember.component.html',
  styleUrls: ['./updatemember.component.css']
})
export class UpdatememberComponent implements OnInit {

  constructor(private service:ApiService) { }

  ngOnInit(): void {
    this.getMember();
  }


  public members: Member[] = [];
  public p!: number;
  public id: any;
  public search!: string;
  getMember() {
    return this.service.getMemberBId(this.id).subscribe(res => {
      this.members = res;
      console.log(this.members);
    });
  }

  updateMember(member: { MemberId: Member; }) {
    this.service.putMember(member.MemberId).subscribe(res => {
      alert("Member updated Successfully");
      
    });
  }
}
