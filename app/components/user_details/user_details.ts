import {Component, View} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';

import UserRepo from '../../services/repositories/user_repo';
import User from '../../services/models/user';

@Component({
    selector: 'user-details'
})
@View({
    templateUrl: './components/user_details/user_details.html'
})
export class UserDetails {
    private user:User;
    private active:string;
    constructor(private repo:UserRepo, params:RouteParams) {
        let username = params.get('username');
        this.repo.getUser(username)
            .then((u:User) => {
                this.user = u;
            })
    }
    setActive(id) {
      this.active = id;
    }
    getActive() {
        return this.active;
    }

}