import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { User } from 'src/app/server/db';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
user:User 
  constructor(private svDb:DbService) { }

  ngOnInit(): void {
this.svDb.getUser().subscribe((val) => {
  this.user = val
  console.log(val);
})

  }
 
}
