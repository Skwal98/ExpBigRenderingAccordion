import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EmbeddedViewRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { BaseAnimation } from 'src/app/base-animations';
import { AccordionComponent } from '../accordion.component';
import { AccordionItemContentDirective } from './accordion-item-content.directive';

@Component({
  selector: 'div[app-accordion-item]',
  templateUrl: 'accordion-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [BaseAnimation.getSlideAnimation(true)],
})
export class AccordionItemComponent implements OnDestroy, AfterViewInit {
  @Input() iconClass: string;
  @Input() text: string;
  @Input() collapsed = true;
  @Input() isValid: boolean;
  @Input() headerTemplate: TemplateRef<unknown>;
  @Output() collapseClick: EventEmitter<void> = new EventEmitter();

  @HostBinding('class.card') hostCard = true;

  @ContentChild(AccordionItemContentDirective)
  content?: AccordionItemContentDirective;
  @ViewChild('contentContainer', {read: ViewContainerRef}) contentContainer: ViewContainerRef;

  public readonly closeDescendantAccordions$: Subject<void> = new Subject();
  public hasContentAtDOM: boolean;

  constructor(
    private _cd: ChangeDetectorRef,
    private _accordion: AccordionComponent
  ) {}
  ngAfterViewInit(): void {
    // console.log('view init acc-item');
  }

  ngOnDestroy(): void {
    this.closeDescendantAccordions$.complete();
  }

  embeddedViewRef: EmbeddedViewRef<any> = null;
  public collapse(): void {
    if (this.embeddedViewRef !== null) {
      this.embeddedViewRef.destroy();
      this.embeddedViewRef = null;
    }
    this.closeDescendantAccordions$.next();
    this.collapsed = true;
    this._cd.markForCheck();
  }

  public collapseModeClick(): void {
    if (this.collapsed) {
      this.collapseClick.emit();
      if (this._accordion.cascadeCollapse) {
        this._accordion.closeAll();
      }
      this.hasContentAtDOM = true;
      this._cd.detectChanges();
      this.collapsed = false;
      if (this.content !== undefined) {
        this.embeddedViewRef = this.contentContainer.createEmbeddedView(
          this.content.templateRef
        );
      }
    } else {
      this.collapse();
    }
    this._cd.markForCheck();
  }

  public animationDone(): void {
    if (this.collapsed) {
      this.hasContentAtDOM = false;
      this._cd.detectChanges();
    }
  }
}
