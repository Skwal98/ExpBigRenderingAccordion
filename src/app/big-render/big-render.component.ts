import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-render',
  templateUrl: 'big-render.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BigRenderComponent {

  get get(){
    console.log('invoked get!');
    return 'a';
  }

  arr: number[];

  constructor() {
    const n = 1000;
    this.arr = Array.from({ length: n }, (value, key) => key);
  }

  test(val){
    console.log(val);
  }
}
