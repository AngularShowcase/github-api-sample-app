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
      <ng-content></ng-content>
    </div>
  `,
  directives: [CORE_DIRECTIVES]
})
export class Tabs {
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
    let idx = this.tabs.length;
    this.tabs.push(tab);
    return idx;
  }
  getSelectedIndex() {
    return this.selectedIdx;
  }
}

@Component({
  selector: 'tab',
  properties: ['title']
})
@View({
  template: `
    <div [hidden]="!isActive()">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {
  public title:string;
  public index:number;
  constructor(@Host() private parent:Tabs) {
    this.index = parent.addTab(this);
  }
  isActive():boolean {
    console.log(this.title, this.parent.getSelectedIndex() === this.index);
    return this.parent.getSelectedIndex() === this.index;
  }
}