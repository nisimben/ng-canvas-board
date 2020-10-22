import { Injectable } from '@angular/core';
import { User } from '../models/UserModel'
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
  },
  {
    name: '1',
    email: '',
    password: 1
  },
  {
    name: 'nisim',
    email: '',
    password: 1
  }
  ]
  public users: BehaviorSubject<User> = new BehaviorSubject<User>(null)
  // current = this.users.asObservable()

  getUser() {
    if (this.users != null) {

      return this.users
    }
  }
  constructor() { }

}
