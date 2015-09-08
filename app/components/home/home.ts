import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import UserRepo from '../../services/repositories/user_repo';
import User from '../../services/models/user';

import {Tabs, Tab} from '../tabs/tabs';

@Component({
  selector: 'home'
})
@View({
  templateUrl: './components/home/home.html?v=<%= VERSION %>',
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, Tabs, Tab]
})
export class Home {
  private loading:boolean;
  constructor(private repo:UserRepo) {}
  addUser(currentUser) {
    this.loading = true;
    this.repo.getUser(currentUser.value)
      .then(u => {
        this.loading = false;
      });
    currentUser.value = '';
  }
  getAll():User[] {
    return this.repo.getAll();
  }
  remove(user:User) {
    this.repo.remove(user);
  }
}
