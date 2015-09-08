import {Host, Directive, Component, View, CORE_DIRECTIVES} from 'angular2/angular2';

@Component({
  selector: 'tabs'
})
@View({
  template: `
    <div class="tabs">
      <ul class="tabs-header">
        <li *ng-for="#tab of tabs; #index = index" (click)="select(index)">{{tab.title}}</li>
      </ul>
      <div class="tabs-content">
      </div>
    </div>
  `,
  directives: [CORE_DIRECTIVES]
})
export class Tabs {
  private titles:string[];
  private contents:string[];
  private selectedIdx:number;
  private tabs:Tab[];
  constructor() {
    this.selectedIdx = 0;
    this.tabs = [];
  }
  select(idx:number) {
    this.selectedIdx = idx;
  }
  addTab(tab:Tab) {
    this.tabs.push(tab);
  }
}

@Directive({
  selector: 'tab',
  properties: ['title']
})
export class Tab {
  public title:string;
  constructor(@Host() parent:Tabs) {
    parent.addTab(this);
  }
}