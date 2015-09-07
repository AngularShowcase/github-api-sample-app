import {Component, View, bootstrap} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_BINDINGS} from 'angular2/router';
import {HTTP_BINDINGS} from 'http/http';

import {Home} from './components/home/home';
import {UserDetails} from './components/user_details/user_details';

import {GitHubAPI} from './services/api/github_api';
import UserRepo from './services/repositories/user_repo';

@Component({
  selector: 'app',
  viewBindings: [UserRepo, GitHubAPI, HTTP_BINDINGS]
})
@RouteConfig([
  { path: '/', component: Home, as: 'home' },
  { path: '/user_details/:username', component: UserDetails, as: 'user_details' }
])
@View({
  templateUrl: './app.html?v=<%= VERSION %>',
  directives: [ROUTER_DIRECTIVES]
})
class App {}

bootstrap(App, [ROUTER_BINDINGS]);
