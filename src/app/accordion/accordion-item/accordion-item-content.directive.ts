import { Directive, Inject, Self, TemplateRef} from '@angular/core';

@Directive({
    selector: '[accordionItemContent]',
})
export class AccordionItemContentDirective {
    constructor(
        @Inject(TemplateRef)
        @Self()
        readonly templateRef: TemplateRef<{}>
    ) {
    }
}
