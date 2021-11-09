import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  OnInit,
  Optional,
  QueryList,
  ViewContainerRef
} from '@angular/core';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionComponent implements OnInit, AfterViewInit {
  @Input() cascadeCollapse = true;
  @Input() closeAllAfterInit = true;
  @Input() solid = true;
  @Input() style: 'light' | 'outline' | 'solid' = 'solid';
  @Input() toggleArrow = false;

  @HostBinding('class') hostClass: string;
  @ContentChildren(AccordionItemComponent) accordionItems: QueryList<AccordionItemComponent>;
  @ContentChildren(AccordionComponent, { descendants: true }) accordions: QueryList<AccordionComponent>;

  constructor(@Optional() parentAccordionItem: AccordionItemComponent, readonly container: ViewContainerRef) {
    parentAccordionItem?.closeDescendantAccordions$.subscribe(() => this.closeAll());
  }

  ngOnInit(): void {
    this.hostClass = `accordion accordion-${this.style}`;
    if (this.toggleArrow) {
      this.hostClass += ' accordion-toggle-arrow';
    } else {
      this.hostClass += ' accordion-toggle-plus';
    }
  }

  ngAfterViewInit(): void {
    if (this.closeAllAfterInit) {
      this.closeAll();
    }
  }

  public closeAll(): void {
    this.accordionItems.forEach(ai => ai.collapse());
    this.accordions.forEach(_ => _.closeAll());
  }
}
