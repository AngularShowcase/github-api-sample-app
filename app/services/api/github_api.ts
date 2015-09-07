import {Inject, Injectable} from 'angular2/angular2';

import {Http} from 'http/http';

import {IPromise} from 'rx';

import {GitHubUser} from './interfaces';
import {GITHUB_API_ROOT, API_TOKEN} from '../../config/config';

class UrlBuilder {
  constructor(private url:string, private token:string) {}
  private appendToken(url:string):string {
    if (this.token) {
      return url + `?access_token=${API_TOKEN}`;
    }
    return url;
  }
  user(user:string):string {
    return this.appendToken(`${this.url}/users/${user}`);
  }
}

@Injectable()
export class GitHubAPI {
  private urlBuilder:UrlBuilder;
  constructor(@Inject(Http) private http:Http) {
    this.urlBuilder = new UrlBuilder(GITHUB_API_ROOT, API_TOKEN);
  }
  public getUser(user:string):IPromise<GitHubUser> {
    return this.http.get(this.urlBuilder.user(user))
      .toRx()
      .map(res => res.json())
      .toPromise();
  }
}
