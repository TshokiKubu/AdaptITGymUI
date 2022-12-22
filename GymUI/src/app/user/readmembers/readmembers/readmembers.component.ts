import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Member } from 'src/app/models/member';
import { Subject } from 'rxjs';
//import { AngularCsv } from 'angular7-csv';

@Component({
  selector: 'app-readmembers',
  templateUrl: './readmembers.component.html',
  styleUrls: ['./readmembers.component.css']
})
export class ReadmembersComponent  implements OnInit, OnDestroy {

 // dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: ApiService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.getMembers();
  }
  public p!: number;
  public search!: string;
  public members: Member[] = [];
 
  getMembers() {
    return this.service.getMembers().subscribe(res => {
      this.members = res;
      // initiate our data table
     // this.dtTrigger.next();
      console.log(this.members);
    });
  }



  
}
