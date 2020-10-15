import { Injectable } from '@angular/core';
import { User } from '../server/db'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  userList = [{
    name: 'aaa',
    email: 'a@a.com',
    password: 1234
  },
  {
    name: 'bbb',
    email: 'a@a.com',
    password: 1234
  }
  ]
  public users: BehaviorSubject<User> = new BehaviorSubject<any>(null)
  // current = this.users.asObservable()

  getUser() {
    if (this.users != null) {

      return this.users
    }
  }
  constructor() { }

}