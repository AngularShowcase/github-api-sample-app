import {Inject, Injectable, IPromise} from 'angular2/angular2';

import {GitHubAPI} from '../api/github_api';
import {GitHubUser} from '../api/interfaces';

import User from '../models/user';

@Injectable()
export default class UserRepo {
  private users:Map<string, User>;
  constructor(@Inject(GitHubAPI) private api:GitHubAPI) {
    this.users = new Map<string, User>();
  }
  getUser(username:string):IPromise<User> {
    if (this.users.has(username)) {
      return Promise.resolve(this.users.get(username));
    } else {
      return this.api.getUser(username)
        .then((u:GitHubUser) => {
          let user = new User();
          user.id = u.id;
          user.name = u.name;
          user.username = u.login;
          user.avatarUrl = u.avatar_url;
          user.followers = u.followers;
          user.following = u.following;
          this.users.set(username, user);
          return user;
        });
    }
  }
  getAll():User[] {
    return this.users.values();
  }
  remove(user:User) {
    this.users.delete(user.username);
  }
}